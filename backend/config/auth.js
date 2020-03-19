const jwt = require('jsonwebtoken');
const jwtSecret = require('./keys').jwtSecret;

const auth = (req, res, db) => {
	const token = req.headers.authorization;
	// console.log(req.headers.authorization);
	// Check for token
	if (!token) {
		res.status(401).json({ status: 401, msg: 'Authorization denied' });
		return db;
	}
	try {
		// Verify token
		const decoded = jwt.verify(token, jwtSecret);
		// Add user from payload
		req.userData = decoded;
		return db;
	} catch (e) {
		console.log(e);
		res.status(401).json({ status: 401, msg: 'Authorization failed' });
	}
};

module.exports = auth;
