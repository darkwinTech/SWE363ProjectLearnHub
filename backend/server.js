require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
	res.json({ message: "backend is running well!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
