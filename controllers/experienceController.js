const Experience = require("../models/Experience");

// GET /api/experiences
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/experiences
const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create({ ...req.body, user: req.user._id });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/experiences/:id
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findOne({ _id: req.params.id, user: req.user._id });
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    Object.assign(experience, req.body);
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/experiences/:id
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
