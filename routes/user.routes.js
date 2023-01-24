const router = require("express").Router();
const { protect } = require("../middlewares/authorization");
const { updateMe } = require("../controller/user.controller");

router.patch("/updateMe", protect, updateMe);

module.exports = router;
