const mongoose = require('mongoose');

export default new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: false,
	},
	facility: {
		type: String,
		required: true,
	},
	apartment: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'pending',
	},
	timestart: {
		type: Date,
		default: Date.now,
	},
	rating: {
		type: Number,
		default: 0,
	},
	assigned: {
		type: String,
		default: 'Unassigned',
	},
	assignedId: {
		type: String,
		default: 'Unassigned',
	},
	priority: {
		type: String,
		default: 'Unassigned',
	},
	timecompleted: {
		type: Date,
	},
	timescheduled: {
		type: Date,
	},
});
