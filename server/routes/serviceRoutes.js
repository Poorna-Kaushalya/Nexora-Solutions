const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * @route   GET /api/services
 * @desc    Fetch all services (Supports optional ?active=true/false and ?search= queries)
 * @access  Public
 */
router.get("/", getServices);

/**
 * @route   GET /api/services/:id
 * @desc    Fetch a single service entry by Object ID
 * @access  Public
 */
router.get("/:id", getService);

// ==========================================
// PROTECTED ADMINISTRATIVE ROUTES
// ==========================================

/**
 * @route   POST /api/services
 * @desc    Initialize a new operational service node
 * @access  Private (Admin Only)
 */
router.post("/", protect, adminOnly, createService);

/**
 * @route   PUT /api/services/:id
 * @desc    Update configuration parameters of an existing service schema
 * @access  Private (Admin Only)
 */
router.put("/:id", protect, adminOnly, updateService);

/**
 * @route   DELETE /api/services/:id
 * @desc    Permanently purge a service record from database collections
 * @access  Private (Admin Only)
 */
router.delete("/:id", protect, adminOnly, deleteService);

module.exports = router;