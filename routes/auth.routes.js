const router = require("express").Router();

const { signin, signup } = require("../controller/auth.controller");

// Signup
router.route("/signup").post(signup);

// Login
router.post("/login", signin);

// Signout
// router.get("/signout", protect, signout);

module.exports = router;
