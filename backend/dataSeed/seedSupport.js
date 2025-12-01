require("dotenv").config();
const mongoose = require("mongoose");
const Support = require("../model/Support");
const User = require("../model/User");

async function seedSupport() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old support tickets
    await Support.deleteMany({});
    console.log("Old support tickets deleted");

    // Get one student to assign tickets to
    const student = await User.findOne({ role: "student" });

    if (!student) {
      console.log("No student found. Run seedUsers.js first!");
      process.exit(0);
    }

    // Sample support tickets
    const tickets = [
      {
        userId: student._id,
        issue: "I cannot join the Teams link.",
        status: "pending",
      },
      {
        userId: student._id,
        issue: "My booking is not showing in the dashboard.",
        status: "pending",
      }
    ];

    await Support.insertMany(tickets);
    console.log("Support tickets seeded!");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedSupport();
