const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const AppError = require("../utils/AppError");

// Protecting Routes
exports.protect = async (req, res, next) => {
  try {
    // Get token
    const token = req.headers.authorization?.split(" ")[1];

    // Check if there is no token
    if (!token || token === "null") {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // Verify and decode the token
    const { userId, iat } = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    // Check if user still exists
    const user = await User.findById(userId);
    if (!user)
      return next(
        new AppError("User no longer exist! Please signup and continue.", 401)
      );

    // Grant access and embed user on the req obj
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Authorization
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
