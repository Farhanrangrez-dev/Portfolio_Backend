const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { getProfile, updateProfile } = require("../controllers/profileController");

router.route("/").get(protect, getProfile).put(protect, upload.single("profilePicture"), updateProfile);

module.exports = router;
