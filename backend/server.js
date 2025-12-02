require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

// middleware
app.use(cors({ origin: "http://localhost:3000" }));  // Allow requests from frontend
app.use(express.json());

// auth routes
const authRoutes = require("./route/authRoutes");  
app.use("/api/auth", authRoutes); 

// support routes
app.use('/api/support', require('./route/supportRoute'));

// notification routes
app.use("/api/notifications", require("./route/notificationRoute"));

// course routes
app.use("/api/courses", require("./route/courseRoutes"));


// Booking routes
const bookingRoutes = require("./route/bookingRoute");
app.use("/api/bookings", bookingRoutes);

// Application routes
const applicationRoutes = require("./route/applicationRoute"); 
app.use("/api/applications", applicationRoutes);

// test route
app.get("/", (req, res) => {
	res.json({ message: "backend is running well!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));