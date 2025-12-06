const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");
const validateReview = require("../middleware/validateReview");
const convertingResponse = require("../middleware/convertingResponse");

// /api/reviews/submit
router.post("/submit", auth,allowRoles("student", "tutor", "admin"), validateReview, convertingResponse(reviewController.submitReview));

// /api/reviews/tutor/:tutorId
router.get("/tutor/:tutorId",auth,allowRoles("student", "tutor", "admin"), convertingResponse(reviewController.getTutorReviews));

// /api/reviews/session/:sessionId
router.get("/session/:sessionId",auth,allowRoles("student", "tutor", "admin"), convertingResponse(reviewController.getSessionReview));

module.exports = router;

