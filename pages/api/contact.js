import nodemailer from 'nodemailer';
import Cors from 'micro-cors';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'PUT' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	const method = req.method;
	switch (method) {
		case 'POST':
			var { name, email, message } = req.body;
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL_ADDRESS || 'noreply.sostein@gmail.com',
					pass: process.env.EMAIL_PASSWORD || 'greenfacility',
				},
			});
			const mailOption = {
				from: 'Noreply Sostein',
				to: `greenfacilityltd@gmail.com`,
				subject: 'Email for contact notification from' + name,
				html: `<p>Name : ${name}</p>
                            <p>Email : ${email}</p>
                            <p>Message : ${message}</p>
                            `,
			};
			transporter.sendMail(mailOption, (err, response) => {
				if (err) {
					return console.log(err);
				} else {
					return res.status(200).json({ success: true, data: 'Email sent successfully' });
				}
			});
			break;
	}
};

export default cors(handler);
