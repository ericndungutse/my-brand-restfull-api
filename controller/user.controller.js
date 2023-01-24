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
