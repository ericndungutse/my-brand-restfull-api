const Blog = require("../model/blog.model.js");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    console.log(error.message);
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

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(202).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.log(error.message);
  }
};
