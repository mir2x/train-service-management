const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const isUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (user && user.role === "admin") {
        next();
      } else {
        return res.status(403).json({ message: "Access denied, admin only" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Access denied, admin only" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { isUser, isAdmin };
