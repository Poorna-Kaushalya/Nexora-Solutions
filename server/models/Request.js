const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
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

    deadline: {
      type: Date,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);