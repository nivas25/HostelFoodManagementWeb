const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password, userType } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send("User already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, userType });
  await user.save();
  res.status(201).send("User registered successfully.");
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password, userType } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials.");

  const token = jwt.sign(
    { id: user._id, userType: user.userType },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token, userType: user.userType });
});

module.exports = router;
