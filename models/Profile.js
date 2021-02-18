const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	artistName: {
		type: String,
		required: true,
	},

	bio: {
		type: String,
	},

	photo: {
		type: String,
	},

	genre: {
		type: String,
		required: true,
	},

	equipments: {
		type: [String],
		required: true,
	},

	social: {
		youtube: {
			type: String,
		},

		twitter: {
			type: String,
		},

		instagram: {
			type: String,
		},

		facebook: {
			type: String,
		},
		soundcloud: {
			type: String,
		},
		spotify: {
			type: String,
		},
		appleMusic: {
			type: String,
		},
		amazonMusic: {
			type: String,
		},
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
