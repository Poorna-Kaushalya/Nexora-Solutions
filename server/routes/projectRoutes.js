const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  searchProjects,
} = require("../controllers/projectController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getProjects);

router.get("/featured", getFeaturedProjects);

router.get("/search", searchProjects);

router.get("/:id", getProject);

// Admin Routes
router.post("/", protect, adminOnly, createProject);

router.put("/:id", protect, adminOnly, updateProject);

router.delete("/:id", protect, adminOnly, deleteProject);

module.exports = router;