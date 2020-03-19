import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../../../backend/config/keys';
import jwt from 'jsonwebtoken';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'PUT', 'PATCH' ],
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
				.find({})
				.sort({ date: -1 })
				.select('-password')
				.then((user) => {
					// console.log(user);
					return res.status(200).json({ success: true, result: user });
				})
				.catch((err) => res.status(500).json({ success: false, msg: 'Unable to fetch users', err }));
			break;
	}
};

export default cors(connectToDb(handler));
