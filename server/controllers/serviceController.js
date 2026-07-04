const Service = require("../models/Service");

// @desc    Create a new operational framework service
// @route   POST /api/services
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: "Service infrastructure node initialized successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all services matching analytical matrix requirements
// @route   GET /api/services
exports.getServices = async (req, res) => {
  try {
    const query = {};

    // Handles both active status options explicitly (true/false strings from query parameters)
    if (req.query.active !== undefined) {
      query.active = req.query.active === "true";
    }

    // RegEx string pattern matching for search indices
    if (req.query.search) {
      query.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    const services = await Service.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a specific single service item by ID
// @route   GET /api/services/:id
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Target service engine reference context not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update an existing service schema structure completely
// @route   PUT /api/services/:id
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Target service engine reference context not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service system parameters synched successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Purge an entry permanently from database records
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Target service engine reference context not found",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service structure purged completely from standard registries",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};