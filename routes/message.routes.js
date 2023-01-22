const router = require("express").Router();

const {
  createMessage,
  getMessages,
  getMessage,
} = require("../controller/messages.controller");
const { protect, restrictTo } = require("../controller/auth.controller");

router
  .route("/")
  .get(protect, restrictTo("sdmin"), getMessages)
  .post(createMessage);
router.route("/:id").get(protect, restrictTo("admin"), getMessage);

module.exports = router;
