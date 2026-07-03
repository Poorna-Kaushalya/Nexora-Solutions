const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload"); 
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

// ========================
// PUBLIC ROUTES
// ========================
router.get("/", getProjects);

router.get("/featured", getFeaturedProjects);

router.get("/search", searchProjects);

router.get("/:id", getProject);

// ========================
// ADMIN ROUTES (PROTECTED)
// ========================

// CREATE PROJECT + IMAGE UPLOAD
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"), 
  createProject
);

// UPDATE PROJECT
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"), 
  updateProject
);

// DELETE PROJECT
router.delete("/:id", protect, adminOnly, deleteProject);

module.exports = router;