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

	avatar: {
		type: mongoose.Schema.Types.String,
		ref: "Photo",
	},

	genre: {
		type: String,
	},

	equipments: {
		type: [String],
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

	notification: {
		likeNotif: [
			{
				read: {
					type: Boolean,
				},

				creator: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},

				recipient: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
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
		commentNotif: [
			{
				read: {
					type: Boolean,
				},

				creator: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},

				recipient: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},

				commentId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Post",
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
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
