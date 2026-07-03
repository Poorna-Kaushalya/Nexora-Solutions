const Project = require("../models/Project");
const Review = require("../models/Review");
const Request = require("../models/Request");
const Service = require("../models/Service");

// Dashboard Summary
const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalRequests = await Request.countDocuments();
    const totalServices = await Service.countDocuments();

    const recentRequests = await Request.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentReviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Basic monthly stats (last 6 months requests)
    const monthlyRequests = await Request.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalReviews,
        totalRequests,
        totalServices,
        recentRequests,
        recentReviews,
        monthlyRequests
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};