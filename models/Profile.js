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

	website: {
		type: String,
	},

	bio: {
		type: String,
	},

	avatar: {
		type: mongoose.Schema.Types.String,
		ref: "Photo",
	},

	genre: {
		type: String,
	},

	equipments: {
		type: String,
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

	notification: [
		{
			read: {
				type: Boolean,
			},

			message: {
				type: String,
			},

			recipient: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},

			postId: {
				type: String,
			},

			name: {
				type: String,
			},

			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
