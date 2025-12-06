const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const auth = require("../middleware/auth");
const convertingResponse = require("../middleware/convertingResponse");

// POST /api/auth/login
router.post("/login", convertingResponse(authController.handleLogin));

// GET /api/auth/profile - Get current user profile
router.get("/profile", auth, convertingResponse(authController.getMyProfile));

// GET /api/auth/tutor - Get tutor profile
router.get("/tutor", auth, convertingResponse(authController.getTutorProfile));

module.exports = router;
