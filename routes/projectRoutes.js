const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { getProjects, createProject, updateProject, deleteProject, getCategories,getSingleProject } = require("../controllers/projectController");

router.route("/").get(getProjects).post(protect, upload.single("image"), createProject);
router.route("/:id")
  .put(protect, upload.single("image"), updateProject)
  .delete(protect, deleteProject);
router.get("/categories", getCategories)
router.get("/single/:id", getSingleProject)

module.exports = router;