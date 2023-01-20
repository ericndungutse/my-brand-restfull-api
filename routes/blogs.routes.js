const router = require("express").Router();
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require("../controller/blogs.controller");

router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
