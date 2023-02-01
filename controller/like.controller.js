const Like = require("../model/like.model");
const Blog = require("../model/blog.model");

exports.createLike = async (req, res, next) => {
  try {
    const like = await Like.create({ user: req.user._id, blog: req.body.blog });

    res.status(201).json({
      status: "success",
      data: {
        like,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllLikes = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.blogId) {
      filter.blog = req.params.blogId;

      await Blog.findById(req.params.blogId);
    }

    const likes = await Like.find(filter).populate("user");

    res.status(201).json({
      status: "success",
      data: {
        likes,
      },
    });
  } catch (error) {
    next(error);
  }
};
