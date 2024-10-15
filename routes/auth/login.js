const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const router = express.Router();

router.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("No user found with the given email");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(`User login Failed : ${error}`);
    res.status(500).json("Server Error!");
  }
});

module.exports = router;
