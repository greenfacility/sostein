import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';
import bcrypt from 'bcryptjs';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'DELETE', 'PATCH' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	const method = req.method;
	const User = db.User;
	switch (method) {
		case 'GET':
			authCheck(req, res, db).User
				.findById(req.query.id)
				.select('-password')
				.then((user) => res.status(200).json(user));
			break;
		case 'DELETE':
			authCheck(req, res, db).User
				.deleteOne({ _id: req.query.id })
				.then((result) => res.status(200).json({ success: true, result }))
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
		case 'PATCH':
			let newData = req.body;
			let final = {};
			for (let key in newData) {
				if (newData[key] !== '') {
					if (key === 'password') {
						bcrypt.genSalt(10, (err, salt) => {
							bcrypt.hash(newData[key], salt, (err, hash) => {
								if (err) throw err;
								final[key] = hash;
								authCheck(req, res, db).User
									.updateOne({ _id: req.query.id }, { $set: final })
									.then((result) => res.status(200).json({ success: true, result }))
									.catch((error) => res.status(500).json({ success: false, error }));
							});
						});
					} else {
						final[key] = newData[key];
					}
				}
			}
			authCheck(req, res, db).User
				.updateOne({ _id: req.query.id }, { $set: final })
				.then((result) => res.status(200).json({ success: true, result }))
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
		// default:
		// 	res.status(404).json({ error: 'This route is not found' });
		// 	break;
	}
};

export default cors(connectToDb(handler));
