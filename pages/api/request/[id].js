import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'DELETE', 'PATCH' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	const method = req.method;
	const Request = db.Request;
	switch (method) {
		case 'GET':
			// authCheck(req, res, db).
			Request.findById(req.query.id)
				.populate('from type')
				.select('-__v')
				.then((result) => {
					var soln = result;

					if (soln.type === null) {
						soln.type = { name: 'Invalid', type: 'Invalid' };
					}

					if (soln.from === null) {
						soln.from = { firstname: 'Unknown', lastname: 'Unknown' };
					}

					return res.status(200).json({
						success: true,
						result: soln,
					});
				})
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
		case 'DELETE':
			authCheck(req, res, db).Request
				.deleteOne({ _id: req.query.id })
				.then((result) => res.status(200).json({ success: true, result }))
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
		case 'PATCH':
			let newData = req.body;
			let final = {};
			for (let key in newData) {
				if (newData[key] !== '') {
					final[key] = newData[key];
				}
			}
			authCheck(req, res, db).Request
				.update({ _id: req.query.id }, { $set: final })
				.then((result) => res.status(200).json({ success: true, result }))
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
	}
};

export default cors(connectToDb(handler));
