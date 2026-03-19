const Skill = require("../models/Skill");

// GET /api/skills
// const getSkills = async (req, res) => {
//   try {
//     const skills = await Skill.find({ user: req.user._id }).sort({ category: 1 });
//     res.json(skills);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// POST /api/skills
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body, user: req.user._id });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/skills/:id
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    Object.assign(skill, req.body);
    await skill.save();
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
