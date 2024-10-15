const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = await User.findById(decoded.id).select("-password"); // Get user, excluding password

      next(); // Call next() to proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" }); // Send error response and return
    }
  }

  // If token is missing
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" }); // Send error response and return
  }
};

module.exports = { protect };
