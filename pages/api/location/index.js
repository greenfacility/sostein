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
	const Location = db.Location;
	switch (method) {
		case 'GET':
			Location.find({})
				.select('-__v')
				.then((result) => res.status(200).json({ result }))
				.catch((err) => res.status(500).json({ msg: `Can't get Locations ${err}` }));
			break;
		// Create new Location
		case 'POST':
			var { state, area } = req.body;
			authCheck(req, res, db).Location
				.find({ state, area })
				.then((result) => {
					if (result.length >= 1) {
						res.status(500).json({ msg: `This Location already exist!`, success: false });
					}
					var newLocation = new Location({
						state,
						area,
					});

					newLocation.save().then((data) => res.json({ success: true, data }));
				})
				.catch((err) => res.status(501).json({ msg: `Not post due to ${err}` }));
			break;
	}
};

export default cors(connectToDb(handler));
