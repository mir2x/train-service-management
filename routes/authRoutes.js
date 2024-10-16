const express = require("express");
const {
  registerUser,
  createAdmin,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const { isUser, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/create-admin", isAdmin, createAdmin);
router.post("/login", loginUser);
router.get("/profile", isUser, getUserProfile);

module.exports = router;
