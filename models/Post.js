const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	text: {
		type: String,
		required: true,
	},

	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},

			liked: {
				type: Boolean,
			},
		},
	],

	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},

			name: {
				type: String,
			},

			text: {
				type: String,
				required: true,
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

module.exports = Post = mongoose.model("Post", PostSchema);
