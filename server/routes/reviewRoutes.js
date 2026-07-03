const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} = require("../controllers/reviewController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// 👤 PUBLIC ROUTES
router.post("/", createReview);
router.get("/", getReviews);

// 🛡 ADMIN ROUTES
router.get("/admin", protect, adminOnly, getAllReviews);
router.put("/:id/approve", protect, adminOnly, approveReview);
router.delete("/:id", protect, adminOnly, deleteReview);

module.exports = router;