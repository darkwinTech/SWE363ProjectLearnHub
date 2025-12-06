const mongoose = require("mongoose");
const Review = require("../model/Review");
const Session = require("../model/Sessions");

//Middleware to validate review submission data

const validateReview = async (req, res, next) => {
  try {
    const { sessionId, rating } = req.body;
    const studentId = req.user?.id;

    // Check if user is authenticated
    if (!studentId) {
      return res.status(401).json({ "message": "Authentication required." });
    }

    // Validate required fields
    if (!sessionId) {
      return res.status(400).json({ "message": "Session ID is required." });
    }
    if (rating === undefined || rating === null) {
      return res.status(400).json({ "message": "Rating is required." });
    }

    // Validate sessionId format
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ "message": "Session ID is not valid." });
    }

    // Check if session exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ "message": "Session not found." });
    }

    // Check if student has already reviewed this session
    const existingReview = await Review.findOne({
      sessionId: sessionId,
      studentId: studentId
    });
    if (existingReview) {
      return res.status(400).json({ "message": "You have already reviewed this session." });
    }

    // Attach session to request for use in controller
    req.validatedSession = session;
    
    next();
  } catch (err) {
    console.log("Error in validateReview middleware:", err);
    return res.status(500).json({ "message": "Internal server error." });
  }
};

module.exports = validateReview;

