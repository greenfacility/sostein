import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../../../backend/config/keys';
import nodemailer from 'nodemailer';
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
		case 'POST':
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL_ADDRESS || 'noreply.sostein@gmail.com',
					pass: process.env.EMAIL_PASSWORD || 'greenfacility',
				},
			});

			if (req.body.email === '') {
				return res.status(400).json({
					status: 400,
					msg: 'Email is required',
				});
			}
			User.findOne({ email: req.body.email }).then((user) => {
				if (!user)
					return res.status(400).json({
						status: 400,
						msg: "Email isn't found!",
					});
				jwt.sign(
					{
						id: user.id,
					},
					jwtSecret,
					{
						expiresIn: 3605,
					},
					(err, token) => {
						const mailOption = {
							from: 'Noreply Sostein',
							to: `${req.body.email}`,
							subject: 'Link To Change Password From SOSTEIN',
							html: `<p>You are recieving this email because you (or someone else) have requested
								for the reset of your account password. Please click the button below or paste the link into
								your browser to complete this process within one hour of recieving it.</p>
								<a href='http://${req.headers
									.host}/reset?token=${token}' style='padding: 8px; decoration: none; background: brown; color: white;'>
								Reset Password</a>
								<p>http://${req.headers.host}/reset?token=${token} If you did not request for this, kindly ignore
								this message and your password will remain unchanged.</p>`,
						};
						if (err) throw err;
						const final = {
							resetpassword: token,
						};
						User.updateOne({ _id: user._id }, { $set: final })
							.then((result) => {
								transporter.sendMail(mailOption, (err, response) => {
									if (err) {
										return console.log(err);
									} else {
										return res.status(200).json({ success: true, data: 'Email sent successfully' });
									}
								});
							})
							.catch((error) => res.status(500).json({ success: false, error }));
					},
				);
			});
			break;
		case 'PATCH':
			const { id, password } = req.body;
			if (password == '') return res.status(400).json({ success: false, msg: "Password can't be empty!" });
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					if (err) throw err;
					authCheck(req, res, db).User
						.updateOne({ _id: id }, { $set: { password: hash } })
						.then((result) => res.status(200).json({ success: true, result }))
						.catch((error) => {
							console.log(error);
							res.status(500).json({ success: false, msg: 'Unable to change password' });
						});
				});
			});
			break;
	}
};

export default cors(connectToDb(handler));
