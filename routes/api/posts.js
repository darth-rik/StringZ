const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//@route  POST api/posts
//@desc   Create a post
//@access Private

router.post(
	"/",
	[auth, [check("text", "Text is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await Profile.findOne({ user: req.user.id }).populate({
				path: "avatar",
				model: "Photo",
			});

			const newPost = new Post({
				text: req.body.text,
				name: user.artistName,
				avatar: user.avatar.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server error");
		}
	}
);
//@route  GET api/posts
//@desc   Get all posts
//@access Private

router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });

		res.json(posts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

//@route  GET api/posts/:id
//@desc   Get posts by id
//@access Private

router.get("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: " Post not found" });
		}

		res.json(post);
	} catch (error) {
		if (error.kind === "ObjectId") {
			return res.status(404).json({ msg: " Post not found" });
		}
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

//@route  DELETE api/posts/:id
//@desc     Delete a post
//@access Private

router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: " Post not found" });
		}

		//Check if user created the post

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		await post.remove();

		res.json({ msg: "Post is removed" });
	} catch (error) {
		if (error.kind === "ObjectId") {
			return res.status(404).json({ msg: " Post not found" });
		}
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

//@route  PUT api/posts/like/:id
//@desc     Like a post
//@access Private

router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if post is liked by user

		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: "Post already liked" });
		}

		post.likes.unshift({ user: req.user.id });
		await post.save();

		//Create a like notification

		const recipient = await Profile.findOne({ user: post.user });

		const currentUser = await Profile.findOne({ user: req.user.id }).populate({
			path: "avatar",
			model: "Photo",
		});

		//Check if like is made by the current user
		if (recipient.user.toString() !== req.user.id) {
			const likeNotif = {
				read: false,

				message: "like",

				recipient: recipient.user,

				postId: req.params.id,

				name: currentUser.artistName,
				avatar: currentUser.avatar.avatar,
			};

			recipient.notification.unshift(likeNotif);

			await recipient.save();
		}

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

//@route  PUT api/posts/unlike/:id
//@desc     UnLike a post
//@access Private

router.put("/unlike/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if post is liked by user

		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: "Post has not been liked" });
		}

		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();
		// Delete like notification
		const recipient = await Profile.findOne({ user: post.user });
		const currentUser = await Profile.findOne({ user: req.user.id });
		if (recipient.user.toString() !== req.user.id) {
			const removeIndex = recipient.notification
				.map((like) => like.message === "like" && like.name)
				.indexOf(currentUser.artistName);
			// .filter((el) => el !== currentUser.artistName);

			// console.log(post.name);
			console.log(removeIndex);

			recipient.notification.splice(removeIndex, 1);
			await recipient.save();
			// console.log(recipient.notification);
		}
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

//@route  POST api/posts/comment/:id
//@desc   Comment on a post
//@access Private

router.post(
	"/comment/:id",
	[auth, [check("text", "Text is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await Profile.findOne({ user: req.user.id }).populate({
				path: "avatar",
				model: "Photo",
			});
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.artistName,
				avatar: user.avatar.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);
			await post.save();

			//Create a comment notification

			const recipient = await Profile.findOne({ user: post.user });

			//Check if comment is made by the current user
			if (recipient.user.toString() !== req.user.id) {
				const commentNotif = {
					read: false,

					message: "comment",

					recipient: recipient.user,

					postId: req.params.id,

					name: user.artistName,
					avatar: user.avatar.avatar,
				};

				recipient.notification.unshift(commentNotif);

				await recipient.save();
			}

			res.json(post.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server error");
		}
	}
);

//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   Delete Comment
//@access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Pull out comment

		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);

		//Check whether comment exists

		if (!comment) {
			return res.status(404).json({ msg: "Comment does not exist" });
		}

		//Check user

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		const recipient = await Profile.findOne({ user: post.user });
		const currentUser = await Profile.findOne({ user: req.user.id });

		if (recipient.user.toString() !== req.user.id) {
			const removeIndex = recipient.notification
				.map((like) => like.message === "comment" && like.name)
				.indexOf(currentUser.artistName);
			// .filter((el) => el !== currentUser.artistName);

			// console.log(post.name);
			console.log(removeIndex);

			recipient.notification.splice(removeIndex, 1);

			await recipient.save();
		}

		post.comments = post.comments.filter(
			({ id }) => id !== req.params.comment_id
		);

		await post.save();

		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
