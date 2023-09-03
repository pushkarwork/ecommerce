const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController")

router.route("/createUser").post(registerUser)
router.route("/loginUser").post(loginUser)

module.exports = router