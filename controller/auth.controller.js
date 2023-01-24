const jwt = require("jsonwebtoken");

const User = require("../model/user.model");
const AppError = require("../utils/AppError");

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

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.create({ name, email, password, confirmPassword });

    signInUser(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// Sign in
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email || !password)
      return next(new AppError("Please provide email and password", 400));

    if (!user || !(user.password === password))
      return next(new AppError("Email or password is incorrect", 403));

    // Sign In User
    signInUser(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Logout
exports.signout = (req, res) => {
  res.status(200).json({ status: "success", token: "" });
};
