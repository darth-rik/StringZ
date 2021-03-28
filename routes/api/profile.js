const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const images = require("../../middleware/images");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const Photo = require("../../models/Photo");

//@route   GET api/profile/me
//@desc    Get current users profile
//@access  Private

router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate({
			path: "avatar",
			model: "Photo",
		});

		if (!profile) {
			return res.status(400).json({ msg: "No profile found for user" });
		}

		res.json(profile);
	} catch (err) {
		res.status(500).send("Server error");
	}
});

//@route   POST api/profile/
//@desc     Create/Update user profile
//@access  Private

router.post("/", [
	auth,

	async (req, res) => {
		if (req.fileValidationError) {
			return res.status(400).json({ msg: req.fileValidationError });
		} // Check if image uploaded is valid or not

		const {
			artistName,
			bio,
			website,
			genre,
			equipments,
			youtube,
			twitter,
			facebook,
			instagram,
			soundcloud,
			spotify,
			amazonMusic,
			appleMusic,
		} = req.body;
		const profileFields = {};

		profileFields.user = req.user.id;

		let avatar = await Photo.findOne({ user: req.user.id });

		if (avatar) {
			profileFields.avatar = avatar.id;
		} else {
			avatar = new Photo({ user: req.user.id });

			await avatar.save();

			profileFields.avatar = avatar.id;
		}

		if (artistName) profileFields.artistName = artistName;
		if (bio) profileFields.bio = bio;
		if (website) profileFields.website = website;

		if (genre) profileFields.genre = genre;
		if (equipments) profileFields.equipments = equipments;

		profileFields.social = {};

		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (instagram) profileFields.social.instagram = instagram;
		if (soundcloud) profileFields.social.soundcloud = soundcloud;
		if (spotify) profileFields.social.spotify = spotify;
		if (appleMusic) profileFields.social.appleMusic = appleMusic;
		if (amazonMusic) profileFields.social.amazonMusic = amazonMusic;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				//Create
				return res.json(profile);
			}

			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.log(err.message);
			return res.status(500).send("Server error");
		}
	},
]);

//@route   POST api/profile/pic
//@desc     Upload Photo of user
//@access  Private
router.post(
	"/pic",
	[
		auth,
		check("avatar", "Picture is required").isEmpty().not(),
		images.uploadUserImage,
	],
	async (req, res) => {
		const photoFields = {};
		// let profile = await Profile.findOne({ user: req.user.id });
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}
		photoFields.user = req.user.id;
		photoFields.avatar = req.file.filename;
		try {
			let avatar = await Photo.findOne({ user: req.user.id });

			//Update
			if (avatar) {
				avatar = await Photo.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: photoFields },
					{ new: true }
				);

				return res.json(avatar);
			}

			//Create

			avatar = new Photo(photoFields);
			await avatar.save();
			res.json(avatar);
		} catch (err) {
			res.status(500).send("Server error");
		}
	}
);

//@route   GET api/profile/search?query
//@desc    Search profiles by name
//@access  Private

router.get("/search", async (req, res) => {
	try {
		let result = await Profile.aggregate([
			{
				$search: {
					autocomplete: {
						query: `${req.query.query}`,
						path: "artistName",
						fuzzy: {
							maxEdits: 2,
							prefixLength: 2,
						},
					},
					// compound: {
					// 	should: [
					// 		{
					// 			autocomplete: {
					// 				query: `${req.query.query}`,
					// 				path: "artistName",
					// 				fuzzy: {
					// 					maxEdits: 2,
					// 					prefixLength: 2,
					// 				},
					// 			},
					// 			autocomplete: {
					// 				query: `${req.query.query}`,
					// 				path: "genre",
					// 				fuzzy: {
					// 					maxEdits: 2,
					// 					prefixLength: 2,
					// 				},
					// 			},
					// 		},
					// 	],
					// },
				},
			},
		]);

		Profile.populate(
			result,
			{ path: "avatar" },

			(err, data) => {
				return res.json(data);
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
//@route   GET api/profile/user/:user_id
//@desc    Get  profile by user id
//@access  Public

router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate({
			path: "avatar",
			model: "Photo",
		});

		if (!profile) return res.status(400).json({ msg: "No profile for user" });

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(400).json({ msg: "No profile for user" });
		}
		res.status(500).send("Server error");
	}
});

//@route   PUT api/profile/:notification_id
//@desc    Mark notification as read
//@access  Private

router.put("/notification/:id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(400).json({ msg: "No profile found for user" });
		}

		const notification = profile.notification.find(
			(not) => not.id === req.params.id
		);

		if (!notification) {
			return res.status(404).json({ msg: "Notification does not exist" });
		}
		//Check user

		if (notification.recipient.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		notification.read = true;

		await profile.save();
		res.json(profile);
	} catch (err) {
		res.status(500).send("Server error");
	}
});

module.exports = router;
