const mongoose = require('mongoose');

export default new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	activity: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
