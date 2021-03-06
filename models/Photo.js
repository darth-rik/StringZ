const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	avatar: {
		type: String,
		default: "default.jpg",
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Photo = mongoose.model("Photo", PhotoSchema);
