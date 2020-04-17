import mongoose from 'mongoose';
import UserSchema from '../model/User';
import ServiceSchema from '../model/Service';
import LocationSchema from '../model/Location';
import RequestSchema from '../model/Request';
import RequestOutSchema from '../model/RequestOut';
import ActivitySchema from '../model/Activity';
import PropertySchema from '../model/Property';

const uri = require('./keys').MongoURI;
const option = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
};

let conn = null;

const connectDb = (handler) => async (req, res) => {
	// Using new database connection
	if (conn == null) {
		conn = await mongoose.createConnection(uri, option);
		conn.model('user', UserSchema);
		conn.model('service', ServiceSchema);
		conn.model('request', RequestSchema);
		conn.model('requestout', RequestOutSchema);
		conn.model('location', LocationSchema);
		conn.model('activities', ActivitySchema);
		conn.model('property', PropertySchema);
	}

	const User = conn.model('user');
	const Service = conn.model('service');
	const Request = conn.model('request');
	const RequestOut = conn.model('requestout');
	const Location = conn.model('location');
	const Activity = conn.model('activities');
	const Property = conn.model('property');
	const db = { User, Service, Request, RequestOut, Activity, Location, Property };
	return handler(req, res, db);
};

export default connectDb;
