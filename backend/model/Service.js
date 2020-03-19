const mongoose = require('mongoose');

export default new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});
