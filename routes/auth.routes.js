const router = require("express").Router();

const {signin} = require('../controller/auth.controller')

// Login
router.post("/login", signin);

// Signout
// router.get("/signout", protect, signout);

module.exports = router;
