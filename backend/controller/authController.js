const mongoose = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Handle user login
 * @param {Request} req - Request object with email and password in body
 * @param {Response} res 
 * @returns token and user data
 */
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return [400, { "message": "Email and password are required." }, null];
    }

    // Check if user exists (case-insensitive search)
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') }
    });
    
    if (!user) {
      return [401, { "message": "Wrong credentials." }, null];
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return [401, { "message": "Wrong credentials." }, null];
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    // Return user data without password
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("User logged in");
    return [200, { token, user: safeUser }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Get current user profile
 * @param {Request} req - Request object with user id from auth middleware
 * @param {Response} res 
 * @returns user profile data
 */
const getMyProfile = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) {
      return [204, { "message": "User not found." }, null];
    }

    return [200, user, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

module.exports = {
  handleLogin,
  getMyProfile
};
