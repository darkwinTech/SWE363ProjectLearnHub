require("dotenv").config();
const mongoose = require("mongoose");
const Notification = require("../model/Notification");
const User = require("../model/User");

async function seedNotifications() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old notifications
    await Notification.deleteMany({});
    console.log("Old notifications deleted");

    // Get student & admin
    const student = await User.findOne({ role: "student" });
    const admin = await User.findOne({ role: "admin" });

    if (!student || !admin) {
      console.log("Users not found — run seedUsers.js first");
      process.exit(0);
    }

    const notifications = [
      {
        userId: student._id,
        title: "Welcome to LearnHub",
        message: "You have successfully created your student account.",
        type: "general",
      },
      {
        userId: student._id,
        title: "Support Ticket Updated",
        message: "Your ticket has been reviewed by admin.",
        type: "support",
      },
      {
        userId: admin._id,
        title: "System Message",
        message: "You have 2 new support tickets to review.",
        type: "support",
      }
    ];

    await Notification.insertMany(notifications);
    console.log("Notifications seeded!");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedNotifications();
