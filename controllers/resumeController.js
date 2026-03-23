const Resume = require("../models/Resume");
const fs = require("fs");
const path = require("path");

// GET /api/resume
// const getResume = async (req, res) => {
//   try {
//     const resume = await Resume.findOne({ user: req.user._id });
//     res.json(resume);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }; 
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/resume
const uploadResume = async (req, res) => {
  try {
    const file = req.files?.resume;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Delete old resume if exists
    const oldResume = await Resume.findOne({ user: req.user._id });
    if (oldResume) {
      const oldPath = path.join(__dirname, "..", oldResume.filepath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      await Resume.deleteOne({ _id: oldResume._id });
    }

    const resume = await Resume.create({
      filename: file.name,
      filepath: `/uploads/${req.file.filename}`,
      user: req.user._id,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const filePath = path.join(__dirname, "..", resume.filepath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Resume.deleteOne({ _id: resume._id });
    res.json({ message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getResume, uploadResume, deleteResume };
