const Review = require("../models/Review");

// 👤 CREATE REVIEW (PUBLIC)
const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🟢 GET APPROVED REVIEWS (HOME)
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🛡 ADMIN - GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🟢 APPROVE REVIEW
const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json({
      success: true,
      message: "Review Approved",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🗑 DELETE REVIEW
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getAllReviews,
  approveReview,
  deleteReview,
};