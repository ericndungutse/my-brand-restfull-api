exports.createBlog = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        message: "Blog Created",
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
