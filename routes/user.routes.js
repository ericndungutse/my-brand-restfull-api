const router = require("express").Router();
const { protect } = require("../controller/auth.controller");
const { updateMe } = require("../controller/user.controller");

router.patch("/updateMe", protect, updateMe);

module.exports = router;
