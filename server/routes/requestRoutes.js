const express = require("express");

const router = express.Router();

const {

    createRequest,

    getRequests,

    getRequest,

    updateStatus,

    deleteRequest,

} = require("../controllers/requestController");

const {

    protect,

    adminOnly,

} = require("../middleware/authMiddleware");

// Public
router.post("/", createRequest);

// Admin
router.get("/", protect, adminOnly, getRequests);

router.get("/:id", protect, adminOnly, getRequest);

router.put("/:id", protect, adminOnly, updateStatus);

router.delete("/:id", protect, adminOnly, deleteRequest);

module.exports = router;