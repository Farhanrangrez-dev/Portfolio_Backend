const HeroSection = require("../models/HeroSection");

// GET /api/hero-section
const getHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne({ user: req.user._id });
    if (!hero) {
      hero = await HeroSection.create({
        name: "Your Name",
        title: "Full Stack Developer",
        user: req.user._id,
      });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/hero-section
const updateHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne({ user: req.user._id });
    if (!hero) {
      hero = await HeroSection.create({ ...req.body, user: req.user._id });
    } else {
      Object.assign(hero, req.body);
      await hero.save();
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHeroSection, updateHeroSection };
