const multer = require("multer");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "client/public/images");
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		req.fileValidationError = "Not an image! Please upload only images";
		cb(null, false, req.fileValidationError);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserImage = upload.single("avatar");
