const mongoose = require("mongoose");
require("dotenv").config();
const Project = require("./models/Project");

const projects = [
  {
    title: "KneeCare",
    category: "AI / IoT",
    technology: "Python, TensorFlow, React, ESP32",
    description:
      "Multi-modal AI system for knee osteoarthritis detection using wearable sensors and deep learning.",
    image: "images/project-1.png",
    github: "https://github.com/Poorna-Kaushalya/KneeCare",
    featured: true,
  },
  {
    title: "Smart Hostel IoT System",
    category: "IoT",
    technology: "JavaScript, Firebase, ESP32",
    description:
      "Built a smart hostel environmental monitoring system.",
    image: "images/project-2.png",
    github: "https://github.com/Poorna-Kaushalya/smart-hostel-iot-system",
    featured: false,
  },
  {
    title: "Class Management System",
    category: "Web App",
    technology: "React, Node.js, MongoDB",
    description:
      "MERN stack system for managing students, courses, and academic workflows.",
    image: "images/project-3.png",
    github: "https://github.com/Poorna-Kaushalya/Class-Management-System",
    featured: false,
  },
  {
    title: "Heart Disease Prediction",
    category: "ML",
    technology: "Python, Machine Learning",
    description:
      "ML model to predict heart disease risk using clinical data.",
    image: "images/project-4.png",
    github: "https://github.com/Poorna-Kaushalya/Heart-Disease-Prediction",
    featured: false,
  },
  {
    title: "Automobile Loan Default Prediction",
    category: "Data Science",
    technology: "Python, Data Science",
    description:
      "Predicts loan default risk using applicant data.",
    image: "images/project-5.png",
    github:
      "https://github.com/Poorna-Kaushalya/Automobile-Loan-Default-Prediction-System",
    featured: false,
  },
  {
    title: "Retail BI Project",
    category: "BI",
    technology: "Power BI, Data Warehouse",
    description:
      "Retail analytics dashboard for business insights.",
    image: "images/project-6.png",
    github:
      "https://github.com/Poorna-Kaushalya/Retail-Transactional-Data-Warehouse-BI-Project",
    featured: false,
  },
  {
    title: "IBM HR Analytics Dashboard",
    category: "BI / HR",
    technology: "Power BI",
    description:
      "HR analytics dashboard for employee attrition analysis.",
    image: "images/project-7.png",
    github:
      "https://github.com/Poorna-Kaushalya/IBM-HR-Analytics-Employee-Attrition-Performance-Dashboard",
    featured: false,
  },
  {
    title: "Stock Price Prediction",
    category: "ML",
    technology: "Python, Time Series",
    description:
      "Stock forecasting using time series analysis.",
    image: "images/project-8.png",
    github:
      "https://github.com/Poorna-Kaushalya/Stock-Price-Prediction-using-Time-Series-Analysis",
    featured: false,
  },
  {
    title: "Online Bus Reservation System",
    category: "Web App",
    technology: "PHP",
    description:
      "Bus ticket booking system with reservation workflow.",
    image: "images/project-9.png",
    github:
      "https://github.com/Poorna-Kaushalya/Online-Bus-Reservation-System",
    featured: false,
  },
  {
    title: "Pet Healthcare System",
    category: "Web App",
    technology: "JavaScript",
    description:
      "Pet healthcare management platform.",
    image: "images/project-10.png",
    github:
      "https://github.com/Poorna-Kaushalya/Pet-Healthcare-And-Accessories-System",
    featured: false,
  },
  {
    title: "School Management System",
    category: "Java",
    technology: "Java OOP",
    description:
      "School management system for students and teachers.",
    image: "images/project-11.png",
    github:
      "https://github.com/Poorna-Kaushalya/Online-School-Information-Management-System",
    featured: false,
  },
  {
    title: "Kotlin Note App",
    category: "Mobile App",
    technology: "Kotlin, Android",
    description:
      "Simple Android note-taking app.",
    image: "images/project-12.png",
    github:
      "https://github.com/Poorna-Kaushalya/Build-Note-App-Using-Kotlin",
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Project.deleteMany(); // clears old data (optional)
    await Project.insertMany(projects);

    console.log("🔥 All projects inserted successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();