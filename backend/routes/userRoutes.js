const express = require("express");
const router = express.Router();


const { isAuthenticated, authorizeRoles } = require("../middleware/auth")
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require("../controllers/userController")


router.route("/createUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, getUserDetails)
router.route("/password/update").put(isAuthenticated, updatePassword)
router.route("/me/update").put(isAuthenticated, updateProfile)
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleUser).put(isAuthenticated, authorizeRoles("admin"), updateRole).delete(isAuthenticated, authorizeRoles("admin"), deleteUser)


module.exports = router