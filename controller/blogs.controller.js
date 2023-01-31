const Blog = require("../model/blog.model.js");
const AppError = require("../utils/AppError");

exports.createBlog = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const blog = await Blog.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      status: "success",
      data: {
        blogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return next(new AppError("Blog not found", 404));

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.blogId, user: req.user._id },
      req.body,
      {
        new: true,
      }
    );

    if (!blog) return next(new AppError("Blog not found", 404));

    res.status(202).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.blogId,
      user: req.user._id,
    });

    if (!blog) return next(new AppError("Blog not found", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
