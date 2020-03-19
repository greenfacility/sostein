const mongoose = require('mongoose');

export default new mongoose.Schema({
	state: {
		type: String,
		required: true,
	},
	area: {
		type: String,
		required: true,
	},
});
