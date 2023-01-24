const router = require("express").Router({ mergeParams: true });

const { protect } = require("../middlewares/authorization");
const { createLike, getAllLikes } = require("../controller/like.controller");

router.route("/").post(protect, createLike).get(getAllLikes);

module.exports = router;
