const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

    try {
    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: "Wrong credentials." });

    // Compare passwords
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(401).json({ message: "Wrong credentials." });

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role, // "admin", "tutor", or "student"
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m"}
    );

    // Return user data without password
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.json({ token, user: safeUser });

    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};