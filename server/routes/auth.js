const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateUser = require("../utils/authentication");

const secretKey = "your-secret-key";

// Landing

router.get("/landing", (req, res) => {
  res.json({ message: "Welcome, This is landing page." });
});

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({
      username: user.username,
      email: user.email,
      userId: user._id
    }, secretKey);

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// User Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Success" }); // Return a JSON response
});

// Protected Route - Example
router.get("/", authenticateUser, (req, res) => {
  res.json({ message: "Authenticated User", user: req.userData });
});

module.exports = router;
