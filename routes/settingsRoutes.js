const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getSettings, updateSettings, changePassword } = require("../controllers/settingsController");

router.route("/").get(protect, getSettings).put(protect, updateSettings);
router.put("/password", protect, changePassword);

module.exports = router;
