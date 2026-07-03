const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    university: {
      type: String,
      required: true,
    },

    projectTitle: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    technology: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);