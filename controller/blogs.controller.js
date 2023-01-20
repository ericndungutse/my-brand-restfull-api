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

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      status: "success",
      data: {
        blogs
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getBlog = async (req, res) => {
  try {
    console.log(req.params);
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        blog
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateBlog = (req, res) => {};

exports.deleteBlog = (req, res) => {};
