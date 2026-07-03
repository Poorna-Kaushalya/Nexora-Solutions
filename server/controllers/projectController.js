const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


// CREATE PROJECT 
const createProject = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "nexora-projects" },
          (error, result) => {
            if (error) return reject(error);
            imageUrl = result.secure_url;
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    }

    const project = await Project.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ALL PROJECTS
// =========================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET FEATURED PROJECTS
// =========================
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true });

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE PROJECT
// =========================
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// SEARCH PROJECTS (FIXED)
// =========================
const searchProjects = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const projects = await Project.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }, // FIXED
      ],
    });

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE PROJECT (FIXED for image)
// =========================
const updateProject = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    let imageUrl = "";

    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "nexora-projects" },
          (error, result) => {
            if (error) return reject(error);
            imageUrl = result.secure_url;
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      updateData.image = imageUrl;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE PROJECT
// =========================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// EXPORTS
// =========================
module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  searchProjects,
};