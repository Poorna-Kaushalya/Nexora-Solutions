require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const requestRoutes = require("./routes/requestRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ======================
// CONNECT DATABASE
// ======================
connectDB();

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

// ======================
// API ROUTES
// ======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Nexora Solutions API 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ======================
// 404 HANDLER
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================
// SOCKET.IO
// ======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  // ======================
  // PROJECT EVENTS
  // ======================
  socket.on("project-updated", () => {
    io.emit("refresh-projects");
  });

  // ======================
  // REQUEST EVENTS
  // ======================
  socket.on("request-updated", () => {
    io.emit("refresh-requests");
  });

  // ======================
  // REVIEW EVENTS
  // ======================
  socket.on("review-updated", () => {
    io.emit("refresh-reviews");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});