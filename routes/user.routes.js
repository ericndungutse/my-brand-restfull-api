const router = require("express").Router();
const { protect } = require("../middlewares/authorization");
const { updateMe, getAllUsers } = require("../controller/user.controller");

router.patch("/updateMe", protect, updateMe);
router.route("/").get(getAllUsers);

module.exports = router;
