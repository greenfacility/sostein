const mongoose = require('mongoose');

export default new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	property: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	ownId: {
		type: String,
		required: true,
	},
});
