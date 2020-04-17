import Cors from 'micro-cors';
// import cron from 'node-cron';
import connectToDb from '../../../../backend/config/db';
import authCheck from '../../../../backend/config/auth';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'PUT' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	const method = req.method;
	const RequestOut = db.RequestOut;

	switch (method) {
		case 'GET':
			RequestOut.find({})
				.sort({ timestart: -1 })
				.then((data) => {
					res.status(200).json({
						result: data,
						status: true,
					});
				})
				.catch((err) => res.status(500).json({ msg: 'Error while fetching data', err, status: false }));
			break;
	}
};

export default cors(connectToDb(handler));
