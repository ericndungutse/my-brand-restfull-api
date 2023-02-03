const User = require("../model/user.model");
const AppError = require("../utils/AppError");

exports.updateMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }).select("-password");

    if (!user) return next(new AppError("User not found", 404));

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -_id -createdAt -updatedAt"
    );

    if (!user) return next(new AppError("User not found.", 400));

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};
