const Project = require("../models/Project");
const cloudinary = require('../config/cloudinary');
const asyncHandler = require("express-async-handler");
const fs = require("fs"); 

cloudinary.config({
  cloud_name: 'dkqcqrrbp',
  api_key: '418838712271323',
  api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
});

const createProject = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startDate,
      endDate,
      liveUrl,
      githubUrl,
    } = req.body;

    // ✅ FIX HERE
    let technologies = [];
    if (req.body.technologies) {
      technologies = JSON.parse(req.body.technologies);
    }

    let imageUrl = "";

if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "projects",
  });

  imageUrl = result.secure_url;
  fs.unlinkSync(req.file.path);
}
 
    const newProject = new Project({
      title,
      description,
      category,
      startDate,
      endDate,
      technologies, // ✅ parsed array
      liveUrl,
      githubUrl,
      image: imageUrl,
      user: req.user._id,
    });

    const saved = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created",
      data: saved,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// POST /api/projects
// const createProject = async (req, res) => {
//   try {
//     const project = await Project.create({ ...req.body, user: req.user._id });
//     res.status(201).json(project);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };





// GET /api/projects
// const getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT /api/projects/:id
// const updateProject = async (req, res) => {
//   try {
//     const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     Object.assign(project, req.body);
//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const updateProject = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const project = await Project.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ technologies fix
    if (req.body.technologies && typeof req.body.technologies === "string") {
      req.body.technologies = JSON.parse(req.body.technologies);
    }

    // ✅ image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });

      project.image = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    // ✅ बाकी fields update
    Object.assign(project, req.body);

    await project.save();

    res.json(project);

  } catch (error) {
    console.log("ERROR:", error); // 👈 debug
    res.status(500).json({ message: error.message });
  }
};




// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unique Categories API
const getCategories = async (req, res) => {
  try {

    const categories = await Project.distinct("category")

    res.json(categories)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// GET SINGLE PROJECT /api/projects/:id
const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json(project)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

 module.exports = { getProjects, createProject, updateProject, deleteProject,getCategories,getSingleProject };