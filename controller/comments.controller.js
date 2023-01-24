const Comment = require("../model/comment.model");

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      user: req.user._id,
      blog: req.body.blog,
      comment: req.body.comment,
    });

    res.status(201).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.blogId) filter.blog = req.params.blogId;
    const comments = await Comment.find(filter).populate("user");

    res.status(201).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};
