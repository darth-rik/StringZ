const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const images = require("../../middleware/images");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//@route   GET api/profile/me
//@desc    Get current users profile
//@access  Private

router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

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
	images.uploadUserImage,
	[
		check("genre", "Genre is required").not().isEmpty(),
		check("equipments", "Equipment/s required").not().isEmpty(),
	],
	async (req, res) => {
		if (req.fileValidationError) {
			return res.status(400).json({ msg: req.fileValidationError });
		} // Check if image uploaded is valid or not

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		const {
			artistName,
			bio,
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
		if (req.file) profileFields.photo = req.file.filename;

		if (artistName) profileFields.artistName = artistName;
		if (bio) profileFields.bio = bio;

		if (genre) profileFields.genre = genre;
		if (equipments)
			profileFields.equipments = equipments.split(",").map((eq) => eq.trim());

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

//@route   GET api/profile
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
							prefixLength: 3,
						},
					},
				},
			},
		]);
		// const profiles = await Profile.find({
		// 	artistName: req.query.query.toString(),
		// }).populate("user", "name");

		// if (profiles.length == 0) {
		// 	return res.status(400).json({ msg: "No user found" });
		// }
		res.send(result);
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
		}).populate("user", "name");

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

module.exports = router;
