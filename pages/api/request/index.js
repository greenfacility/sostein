import Cors from 'micro-cors';
// import cron from 'node-cron';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'PUT' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	const method = req.method;
	const Request = db.Request;
	const RequestOut = db.RequestOut;

	switch (method) {
		case 'GET':
			Request.find({})
				.populate('from type')
				.sort({ timestart: -1 })
				.then((data) => {
					var results = data.map((result) => {
						var soln = result;

						if (soln.type === null) {
							soln.type = { name: 'Invalid', type: 'Invalid' };
						}

						if (soln.from === null) {
							soln.from = { firstname: 'Unknown', lastname: 'Unknown' };
						}
						return soln;
					});
					return res.status(200).json({
						result: results,
						status: true,
					});
				})
				.catch((err) => res.status(500).json({ msg: 'Error while fetching data', err, status: false }));
			break;
		// Create new service
		case 'PUT':
			var { address, apartment, description, email, facility, fullname, phone, picture, type } = req.body;
			if (
				address != '' &&
				apartment != '' &&
				description != '' &&
				email != '' &&
				facility != '' &&
				fullname != '' &&
				phone != '' &&
				type
			) {
				var newRequest = new RequestOut({
					address,
					apartment,
					description,
					email,
					facility,
					fullname,
					phone,
					picture,
					type,
				});
				newRequest
					.save()
					.then((result) => res.status(201).json({ success: true, result }))
					.catch((err) => res.status(501).json({ msg: `Not post due to ${err}` }));
			} else {
				res.status(500).json({ success: false, msg: 'Please enter all required field!' });
			}
			break;

		case 'POST':
			var { name, type, from, description, picture, property, propertyId } = req.body;
			if (
				name !== '' &&
				type !== '' &&
				from !== '' &&
				description !== '' &&
				property !== '' &&
				propertyId !== ''
			) {
				authCheck(req, res, db).Request
					.find({ name })
					.then((data) => {
						// if (data.length > 0) {
						// 	return res.status(500).json({ status: false, msg: 'Unable to add request' });
						// }
						var newRequest = new Request({
							name,
							type,
							from,
							description,
							picture,
							property,
							propertyId,
						});
						newRequest.save().then((result) => res.status(201).json({ success: true, result }));
					})
					.catch((err) => res.status(501).json({ msg: `Not post due to ${err}` }));
			} else {
				res.status(500).json({ success: false, msg: 'Please enter all required field!' });
			}
			break;
	}
};

export default cors(connectToDb(handler));
