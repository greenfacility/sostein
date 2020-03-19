const express = require('express');
const auth = require('../config/auth');
const connectToDb = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const router = express.Router();

// User Model
const User = require('../model/User');

// Get all users
router.get('/', async (req, res) => {
	// await connectToDb().then((res) => console.log(res)).catch((err) => console.log(err));
	User.find({}).select('-password').then((users) => res.json(users));
});

module.exports = router;
