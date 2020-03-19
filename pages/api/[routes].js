import Cors from 'micro-cors';
import connectToDb from '../../backend/config/db';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'DELETE', 'PUT' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	db.Request.find({}).populate('from type').select('-__v').then((users) => res.json(users));
};

export default cors(connectToDb(handler));
