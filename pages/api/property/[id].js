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
	const Property = db.Property;
	switch (method) {
		case 'GET':
			Property.findById(req.query.id)
				.select('-__v')
				.then((result) => res.status(200).json({ result }))
				.catch((err) => res.status(500).json({ msg: `Can't get properties ${err}` }));
			break;
		case 'DELETE':
			authCheck(req, res, db).Property
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
			authCheck(req, res, db).Property
				.updateOne({ _id: req.query.id }, { $set: final })
				.then((result) => res.status(200).json({ success: true, result }))
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
	}
};

export default cors(connectToDb(handler));
