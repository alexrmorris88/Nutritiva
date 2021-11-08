const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../utils/authCheck");

// importing function from the controller
const {
  newUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUserByID,
  login,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
  getLoggedInUser,
} = require("./controllers/userController");


// New User
router.route("/register").post(newUser);

// Private/Admin - Get All User
router
  .route("/search")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Private/Admin - Get All User
router
  .route("/search/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserByID);

// Private - Update User by ID
router.route("/update/:id").put(isAuthenticatedUser, updateUser);

// Private\Admin - Update User by ID
router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByID);

// Login User
router.route("/login").post(login);

// Logout User
router.route("/logout").get(logout);

// Private - Update Password
router.route("/update-password").put(isAuthenticatedUser, updatePassword);

// Forgot Password
router.route("/forgot-password").post(forgotPassword);

// Reset Password
router.route("/reset-password/:token").put(resetPassword);

// Private - Get Logged in User
router.route("/user").get(isAuthenticatedUser, getLoggedInUser);

// Export Router
module.exports = router;
