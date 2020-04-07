const mongoose = require('mongoose');

export default new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	resetpassword: {
		type: String,
		required: false,
	},
	phonenumber: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		// required: true,
	},
	about: {
		type: String,
		required: true,
	},
	usertype: {
		type: String,
		default: 'user',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
