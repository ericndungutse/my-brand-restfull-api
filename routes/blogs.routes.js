const router = require("express").Router();
const { createBlog, getBlogs } = require("../controller/blogs.controller");

router.route("/").get(getBlogs);

module.exports = router;
