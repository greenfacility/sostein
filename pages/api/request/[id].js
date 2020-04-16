import Cors from 'micro-cors';
import cron from 'node-schedule';
import nodemailer from 'nodemailer';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'DELETE', 'PATCH' ],
});

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_ADDRESS || 'noreply.sostein@gmail.com',
		pass: process.env.EMAIL_PASSWORD || 'greenfacility',
	},
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
			authCheck(req, res, db).Request
				.findById(req.query.id)
				.then((requests) => {
					for (let key in newData) {
						if (newData[key] !== '') {
							final[key] = newData[key];
							if (key === 'assigned') {
								const mailOption3 = {
									from: 'No-Reply Sostein',
									to: `${req.body.email}`,
									subject: `Alert: A Work Order with Name "${requests.name}"`,
									html: `<p>This is to notify you about a work order been assigned to you.</p>
							<p>It has a description <b>${requests.description}</b> Kindly login to your account to check it out.</p><b>Thank You</b>`,
								};
								transporter.sendMail(mailOption3, (err, response) => {
									if (err) {
										console.log(err);
									} else {
										res.status(200).json({ success: true, data: 'Email sent successfully' });
									}
								});
							}
						}
					}
					authCheck(req, res, db).Request
						.updateOne({ _id: req.query.id }, { $set: final })
						.then((result) => res.status(200).json({ success: true, result }))
						.catch((error) => res.status(500).json({ success: false, error }));
				})
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
		case 'PUT':
			const timescheduled = req.body.timescheduled;
			let date = new Date(timescheduled);
			let newdate = new Date(date.getTime() - 6000000);
			//Call the function to schedule email sending
			// console.log(newdate, date);
			if (timescheduled === '' || typeof timescheduled === 'undefined')
				return res.status(400).json({ success: false, msg: 'No time is scheduled' });
			authCheck(req, res, db).Request
				.update({ _id: req.query.id }, { $set: { timescheduled } })
				.then((result) => {
					Request.findById(req.query.id).then((ans) => {
						const mailOption1 = {
							from: 'Noreply Sostein',
							to: `${req.body.email}`,
							subject: `Alert On The Job ${ans.name}`,
							html: `<p>This is to notify you about a work order you are to finish within some hours
						please kindly ignore this message if you have finished it.</p>
						<p>Please log on to your account to check if you've done the work assigned to you. It has a description <b>${ans.description}</b> </p>
						<b>Thank You</b>`,
						};
						const mailOption2 = {
							from: 'Noreply Sostein',
							to: `${req.body.email}`,
							subject: `Alert On The Job ${ans.name}`,
							html: `<p>This is to notify you about a work order you just scheduled for ${date.toDateString()}.</p>
							<p>It has a description <b>${ans.description}</b> </p><b>Thank You</b>`,
						};
						transporter.sendMail(mailOption2, (err, response) => {
							if (err) {
								console.log(err);
							} else {
								res.status(200).json({ success: true, data: 'Email sent successfully' });
							}
						});
						cron.scheduleJob(newdate, () => {
							transporter.sendMail(mailOption1, (err, response) => {
								if (err) {
									console.log(err);
								} else {
									res.status(200).json({ success: true, data: 'Email sent successfully' });
								}
							});
						});
					});
				})
				.catch((error) => res.status(500).json({ success: false, error }));
			break;
	}
};

export default cors(connectToDb(handler));
