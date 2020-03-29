import Cors from 'micro-cors';
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

					// var manup = results.map((soln) => {
					// 	var final = {
					// 		_id: soln._id,
					// 		name: soln.name,
					// 		type: `${soln.type.name}, ${soln.type.type}`,
					// 		from: `${soln.from.firstname} ${soln.from.lastname}`,
					// 		by_id: soln.from._id,
					// 		assigned: `${soln.assigned.firstname} ${soln.assigned.lastname}`,
					// 		assign_id: soln.assigned._id,
					// 		status: soln.status,
					// 		timestart: soln.timestart,
					// 		timecompleted: soln.timecompleted,
					// 	};
					// 	return final;
					// });

					return res.status(200).json({
						result: results,
						status: true,
					});
				})
				.catch((err) => res.status(500).json({ msg: 'Error while fetching data', err, status: false }));
			break;
		// Create new service
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
