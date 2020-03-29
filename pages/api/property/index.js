import Cors from 'micro-cors';
import connectToDb from '../../../backend/config/db';
import authCheck from '../../../backend/config/auth';

const cors = Cors({
	allowMethods: [ 'GET', 'POST', 'PUT' ],
});

const handler = (req, res, db) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, GET, DELETE, POST');

	const method = req.method;
	const Property = db.Property;
	switch (method) {
		case 'GET':
			Property.find({})
				.select('-__v')
				.then((result) => res.status(200).json({ result }))
				.catch((err) => res.status(500).json({ msg: `Can't get Properties ${err}` }));
			break;
		// Create new Property
		case 'POST':
			var { name, property, location, ownId } = req.body;
			authCheck(req, res, db).Property
				.find({ name, property })
				.then((result) => {
					if (result.length >= 1) {
						res.status(500).json({ msg: `This Property already exist!`, success: false });
					}
					var newProperty = new Property({
						name,
						property,
						location,
						ownId,
					});

					newProperty.save().then((data) => res.json({ success: true, data }));
				})
				.catch((err) => res.status(501).json({ msg: `Not post due to ${err}` }));
			break;
	}
};

export default cors(connectToDb(handler));
