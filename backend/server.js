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

// test route
app.get("/", (req, res) => {
	res.json({ message: "backend is running well!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

