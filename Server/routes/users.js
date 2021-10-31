const express = require("express");
const router = express.Router();

// importing function from the controller
const {
  newUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUserByID,
  login,
  logout,
} = require("./controllers/userController");

// New User
router.route("/register").post(newUser);

// TODO: Private/Admin - Get All User
router.route("/search").get(getAllUsers);

// TODO: Private/Admin - Get All User
router.route("/search/:id").get(getUserByID);

// TODO: Private - Update User by ID
router.route("/update/:id").put(updateUser);

// TODO: Private\Admin - Update User by ID
router.route("/delete/:id").delete(deleteUserByID);

// Login User
router.route("/login").post(login);

// Logout User
router.route("/logout").get(logout);

// Export Router
module.exports = router;
