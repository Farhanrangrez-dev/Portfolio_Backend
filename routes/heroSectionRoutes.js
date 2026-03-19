const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getHeroSection, updateHeroSection } = require("../controllers/heroSectionController");

router.route("/").get(protect, getHeroSection).put(protect, updateHeroSection);

module.exports = router;
