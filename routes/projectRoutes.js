const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getProjects, createProject, updateProject, deleteProject, getCategories,getSingleProject } = require("../controllers/projectController");

router.route("/").get(getProjects).post(protect, createProject);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);
router.get("/categories", getCategories)
router.get("/single/:id", getSingleProject)

module.exports = router;