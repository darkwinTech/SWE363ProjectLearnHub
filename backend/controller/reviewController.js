const mongoose = require("mongoose");
const Review = require("../model/Review");
const Session = require("../model/Sessions");
const Booking = require("../model/Booking");
const TutorProfile = require("../model/TutorProfile");

/**
 * Submit a review/rating for a session
 * @param {Request} req - Request object with sessionId, rating, and optional comment in body
 * @param {Response} res 
 * @returns created review and updated tutor rating
 */
const submitReview = async (req, res) => {
  try {
    const { sessionId, rating, comment } = req.body;
    const studentId = req.user?.id;

    // Session should be validated by middleware, but fetch if not available
    const session = req.validatedSession || await Session.findById(sessionId);
    if (!session) {
      return [404, { "message": "Session not found." }, null];
    }

    // Create the review
    const review = await Review.create({
      sessionId: sessionId,
      tutorId: session.tutorId,
      studentId: studentId,
      rating: rating,
      comment: comment || ""
    });

    // Update tutor's average rating
    const tutorId = session.tutorId;
    const tutorReviews = await Review.find({ tutorId: tutorId });
    
    if (tutorReviews.length > 0) {
      const averageRating = tutorReviews.reduce((sum, rev) => sum + rev.rating, 0) / tutorReviews.length;
      
      // Update tutor profile rating
      const tutorProfile = await TutorProfile.findOne({ userId: tutorId });
      if (tutorProfile) {
        tutorProfile.rating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place
        await tutorProfile.save();
      }
    }

    console.log("Review submitted successfully");
    return [201, {
      message: "Review submitted successfully",
      review: review,
    }, null];
  } catch (err) {
    console.log("Error submitting review:", err);
    return [500, { "message": "Internal server error." }, null];
  }
};

/**
 * Get all reviews for a specific tutor
 * @param {Request} req - Request object with tutorId in params
 * @param {Response} res 
 * @returns list of reviews for the tutor
 */
const getTutorReviews = async (req, res) => {
  try {
    const { tutorId } = req.params;

    if (!tutorId) {
      return [400, { "message": "Tutor ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(tutorId)) {
      return [400, { "message": "Tutor ID is not valid." }, null];
    }

    const reviews = await Review.find({ tutorId: tutorId })
      .populate("studentId", "name email studentId")
      .populate("sessionId", "title courseId dateTime")
      .sort({ createdAt: -1 });

    return [200, {
      reviews: reviews,
      count: reviews.length
    }, null];
  } catch (err) {
    console.log("Error fetching tutor reviews:", err);
    return [500, { "message": "Internal server error." }, null];
  }
};

/**
 * Get review for a specific session
 * @param {Request} req - Request object with sessionId in params and user id from auth middleware
 * @param {Response} res 
 * @returns review for the session by the authenticated user
 */
const getSessionReview = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const studentId = req.user?.id;

    if (!sessionId) {
      return [400, { "message": "Session ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return [400, { "message": "Session ID is not valid." }, null];
    }

    const review = await Review.findOne({
      sessionId: sessionId,
      studentId: studentId
    })
      .populate("sessionId", "title courseId dateTime")
      .populate("tutorId", "name");

    if (!review) {
      return [404, { "message": "Review not found for this session." }, null];
    }

    return [200, { review: review }, null];
  } catch (err) {
    console.log("Error fetching session review:", err);
    return [500, { "message": "Internal server error." }, null];
  }
};

module.exports = {
  submitReview,
  getTutorReviews,
  getSessionReview
};

