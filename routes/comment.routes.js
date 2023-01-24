const router = require("express").Router({ mergeParams: true });

const { protect } = require("../middlewares/authorization");
const {
  createComment,
  getAllComments,
} = require("../controller/comments.controller");

router.route("/").post(protect, createComment).get(getAllComments);

module.exports = router;
