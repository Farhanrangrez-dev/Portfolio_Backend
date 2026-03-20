const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { getResume, uploadResume, deleteResume } = require("../controllers/resumeController");

router.route("/").get(getResume).post(upload.single("resume"), uploadResume).delete(protect, deleteResume);

module.exports = router;
