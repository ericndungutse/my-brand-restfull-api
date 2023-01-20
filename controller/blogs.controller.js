const Blog = require("../model/blog.model.js");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

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

exports.getBlogs = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        message: "Blogs",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getBlog = (req, res) => {};

exports.updateBlog = (req, res) => {};

exports.deleteBlog = (req, res) => {};
