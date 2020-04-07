import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../../../backend/config/keys';
import jwt from 'jsonwebtoken';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'PUT' ],
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
				.findById(req.userData.id)
				.select('-password')
				.then((user) => res.status(200).json(user));
			break;

		// Sign In To the Api
		case 'POST':
			// console.log(method);
			var { email, password } = req.body;
			var logger = email;
			if (!logger || !password) {
				return res.status(400).json({
					status: 400,
					msg: 'Enter All Field',
				});
			}
			User.findOne({
				email,
			})
				.then((user) => {
					if (!user)
						return res.status(400).json({
							status: 400,
							msg: "User Doesn't Exist!",
						});
					bcrypt.compare(password, user.password).then((isMatch) => {
						if (!isMatch)
							return res.status(400).json({
								status: 400,
								msg: 'Invalid or Wrong Password',
							});
						jwt.sign(
							{
								id: user.id,
							},
							jwtSecret,
							{
								expiresIn: 3600000000,
							},
							(err, token) => {
								if (err) throw err;
								res.json({
									token,
									user,
								});
							},
						);
					});
				})
				.catch((err) =>
					res.status(500).json({
						status: 500,
						msg: 'Error from database',
						error: err,
					}),
				);
			break;
		case 'PUT':
			// console.log('putting');
			var { password, firstname, lastname, email, phonenumber, address, picture, about } = req.body;

			if (
				!password &&
				!firstname &&
				!lastname &&
				!email &&
				!phonenumber &&
				!address &&
				!about
				// !picture
			) {
				return res.status(400).json({
					status: 400,
					msg: 'Enter All Required Field',
				});
			}

			User.findOne({
				email,
			})
				.then((user) => {
					if (user) {
						if (user.email == email) {
							return res.status(400).json({
								status: 400,
								msg: 'Sorry, User Already Exist!',
							});
						}
						return res.status(400);
					}

					var newUser = new User({
						password,
						firstname,
						lastname,
						email,
						phonenumber,
						address,
						picture,
						about,
					});

					// Create Salt and Hash
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.save().then((user) => {
								jwt.sign(
									{
										id: user.id,
									},
									jwtSecret,
									{
										expiresIn: 3600000000,
									},
									(err, token) => {
										if (err) throw err;
										res.status(201).json({
											token,
											user,
										});
									},
								);
							});
						});
					});
				})
				.catch((err) =>
					res.status(500).json({
						status: 500,
						msg: 'Error: Unable to handle request',
						error: err,
					}),
				);
	}
};

export default cors(connectToDb(handler));
