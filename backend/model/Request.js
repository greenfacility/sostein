const mongoose = require('mongoose');

export default new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'service',
		required: true,
	},
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	picture: {
		type: String,
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
	priority: {
		type: String,
		default: 'Unassigned',
	},
	timecompleted: {
		type: Date,
	},
});
