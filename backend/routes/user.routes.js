const express = require('express');
const auth = require('../config/auth');
const connectToDb = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const router = express.Router();

// User Model
const User = require('../model/User');

// Get a particular user
router.get('/', auth, async (req, res) => {
	await connectToDb();
	User.findById(req.user.id).select('-password').then((user) => res.json(user));
});

// // Get all users
// router.get('/all', async (req, res) => {
// 	await connectToDb();
// 	User.find({}).select('-password').then((users) => res.json(users));
// });

// For Register
router.post('/register', async (req, res) => {
	await connectToDb();
	var { password, firstname, lastname, email, phonenumber, address, picture } = req.body;

	if (
		!password ||
		!firstname ||
		!lastname ||
		!email ||
		!phonenumber ||
		!address
		// !picture
	) {
		return res.status(400).json({
			status: 400,
			msg: 'Enter All Required Field',
		});
	}

	User.findOne({
		email,
	}).then((user) => {
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
							res.json({
								token,
								user,
							});
						},
					);
				});
			});
		});
	});
});

// For Login
router.post('/', async (req, res) => {
	await connectToDb();
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
	}).then((user) => {
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
	});
});

router.delete('/:id', auth, async (req, res) => {
	await connectToDb();
	User.findByIdAndDelete(req.params.id, (err, todo) => {
		if (err)
			return res.status(500).send({
				status: 500,
				success: false,
			});
		return res.json({
			success: true,
		});
	});
});

router.patch('/activate', auth, async (req, res) => {
	await connectToDb();
	// Create Salt and Hash
	var { idtoupdate, isactivated } = req.body;
	// console.log(req.user)

	User.findById(req.user.id).then((user) => {
		if (user.usertype === 'manager' || 'admin') {
			console.log(user.isactivated);
			User.findByIdAndUpdate(
				idtoupdate,
				{ isactivated },
				{
					new: true,
				},
				(err, data) => {
					if (err) return res.status(500).send(err);
					return res.json(data);
				},
			);
		} else {
			return res.status(401).json({
				status: 400,
				msg: "You're not an admin",
			});
		}
	});
});

router.patch('/:id', async (req, res) => {
	await connectToDb();
	// Create Salt and Hash
	var { password } = req.body;
	var newUser = {
		password,
	};
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			User.findByIdAndUpdate(
				req.params.id,
				newUser,
				{
					new: true,
				},
				(err, data) => {
					if (err) return res.status(500).send(err);
					return res.json(data);
				},
			);
		});
	});
});

//Only admin or manager can make you admin.
router.post('/admin', auth, async (req, res) => {
	await connectToDb();
	// Create Salt and Hash
	var { idtoupdate, usertype } = req.body;
	var newUser = {
		usertype,
	};
	User.findById(req.user.id).then((user) => {
		if (user.usertype === 'manager' || 'admin') {
			User.findByIdAndUpdate(
				idtoupdate,
				newUser,
				{
					new: true,
				},
				(err, data) => {
					if (err) return res.status(500).send(err);
					return res.json(data);
				},
			);
		} else {
			return res.status(401).json({
				status: 401,
				msg: "You're not an admin",
			});
		}
	});
});

module.exports = router;
