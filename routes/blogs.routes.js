const router = require("express").Router();
const { protect } = require("../middlewares/authorization");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogs.controller");

const commentRouter = require("../routes/comment.routes");
const likeRouter = require("../routes/likes.routes");

// Get Blogs Comments
router.use("/:blogId/comments", commentRouter);

// Get Blogs Likes
router.use("/:blogId/likes", likeRouter);

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:blogId").get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
