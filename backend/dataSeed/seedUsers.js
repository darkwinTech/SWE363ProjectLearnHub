require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear existing users
		await User.deleteMany({});

		const users = [
			{
				name: "Admin User",
				email: "admin@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("admin123", 10),
				role: "admin",
				major: "Management",
				year: "N/A",
			},
			{
				name: "Tutor User",
				email: "tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				major: "Software Engineering",
				year: "Senior",
			},
			{
				name: "Student User",
				email: "student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				major: "Computer Science",
				year: "Junior",
			},
		];

		await User.insertMany(users);
		console.log("Seeded default users");
	} catch (err) {
		console.error("Seeding error:", err);
	}
}

seed();