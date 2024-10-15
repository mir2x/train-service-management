const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../../models/User");

const router = express.Router();

router.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "An account already exists with the given Email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch {
    (error) => console.log(`User registration failed : ${error.message}`);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
