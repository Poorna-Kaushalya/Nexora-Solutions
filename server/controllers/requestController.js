const Request = require("../models/Request");
const transporter = require("../config/mail");

// Create Request
const createRequest = async (req, res) => {
    try {

        const request = await Request.create(req.body);

        // Email Notification
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

                <p><strong>Technology:</strong> ${request.technology}</p>

                <p><strong>Deadline:</strong> ${request.deadline}</p>

                <p><strong>Budget:</strong> Rs. ${request.budget}</p>

                <p>${request.description}</p>

            `,
        });

        res.status(201).json({

            success: true,

            message: "Project request submitted successfully",

            request,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// Get All Requests
const getRequests = async (req, res) => {

    try {

        const requests = await Request.find().sort({

            createdAt: -1,

        });

        res.json({

            success: true,

            count: requests.length,

            requests,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Get Single Request
const getRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {

            return res.status(404).json({

                success: false,

                message: "Request not found",

            });

        }

        res.json({

            success: true,

            request,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Update Status
const updateStatus = async (req, res) => {

    try {

        const request = await Request.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status,
            },

            {
                new: true,
            }

        );

        res.json({

            success: true,

            message: "Status Updated",

            request,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// Delete Request
const deleteRequest = async (req, res) => {

    try {

        await Request.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Request Deleted",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    createRequest,

    getRequests,

    getRequest,

    updateStatus,

    deleteRequest,

};