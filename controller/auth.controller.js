const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signInUser = (user, status, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Sign in
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email || !password)
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });

    if (!user || !(user.password === password))
      return res.status(403).json({
        status: "fail",
        message: "Email or password is incorrect",
      });

    // Sign In User
    signInUser(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Logout
exports.signout = (req, res) => {
  res.status(200).json({ status: "success", token: "" });
};

exports.protect = async (req, res, next) => {
  try {
    // Get token
    const token = req.headers.authorization?.split(" ")[1];

    // Check if there is no token
    if (!token || token === "null") {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // Verify and decode the token
    const { userId, iat } = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    // Check if user still exists
    const user = await User.findById(userId);
    if (!user)
      return res.status().json({
        status: "success",
        message: "User no longer exist! Please signup and continue.",
      });

    // Grant access and embed user on the req obj
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

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
