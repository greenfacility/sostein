import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';
import bcrypt from 'bcryptjs';
// import { jwtSecret } from '../../../backend/config/keys';
// import jwt from 'jsonwebtoken';

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
			// authCheck(req, res, db).
			User.findById(req.query.id)
				.select('-password -__v')
				.then((user) => res.status(200).json({ success: true, result: user }))
				.catch((err) => res.status(404).json({ success: false, msg: 'Unable to fetch users' }));
			break;
		// case 'DELETE':
		// 	authCheck(req, res, db).User
		// 		.remove({ _id: req.query.id })
		// 		.then((result) => res.status(200).json({ success: true, result }))
		// 		.catch((error) => res.status(500).json({ success: false, error }));
		// 	break;
		case 'PATCH':
			let newData = req.body;
			let final = {};
			let hashPassword = '';
			for (let key in newData) {
				if (newData[key] !== '') {
					if (key === 'password') {
						bcrypt.genSalt(10, (err, salt) => {
							bcrypt.hash(newData[key], salt, (err, hash) => {
								if (err) throw err;
								hashPassword = hash;
								final[key] = hashPassword;
								// console.log(final);
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
			// console.log(final);
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
