const Request = require("../models/Request");
const transporter = require("../config/mail");

// CREATE REQUEST
const createRequest = async (req, res) => {
    try {
        console.log("REQUEST BODY:", req.body);

        const request = await Request.create(req.body);

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: "New Project Request",
                html: `
          <h2>New Project Request</h2>
          <p><strong>Name:</strong> ${request.name}</p>
          <p><strong>Email:</strong> ${request.email}</p>
          <p><strong>Phone:</strong> ${request.phone}</p>
          <p><strong>University:</strong> ${request.university}</p>
          <p><strong>Project:</strong> ${request.projectTitle}</p>
          <p><strong>Deadline:</strong> ${request.deadline}</p>
          <p><strong>Description:</strong> ${request.description}</p>
        `,
            });
        } catch (mailError) {
            console.log("EMAIL ERROR:", mailError.message);
        }

        res.status(201).json({
            success: true,
            message: "Request submitted successfully",
            request,
        });

    } catch (error) {
        console.log("CREATE REQUEST ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL
const getRequests = async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            requests,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ONE
const getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        res.json({ success: true, request });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE STATUS
const updateStatus = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json({
            success: true,
            message: "Status updated",
            request,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE
const deleteRequest = async (req, res) => {
    try {
        await Request.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Request deleted",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createRequest,
    getRequests,
    getRequest,
    updateStatus,
    deleteRequest,
};