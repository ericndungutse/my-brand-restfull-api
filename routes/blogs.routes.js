const router = require("express").Router();
const { protect } = require("../middlewares/authorization");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogs.controller");

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
