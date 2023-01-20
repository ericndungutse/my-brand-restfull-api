const router = require("express").Router();
const { createBlog, getBlogs, getBlog } = require("../controller/blogs.controller");

router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlog)

module.exports = router;
