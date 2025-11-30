const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// POST /api/auth/login
router.post("/login", authController.handleLogin);

module.exports = router;
