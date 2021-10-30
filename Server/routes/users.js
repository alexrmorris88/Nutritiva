const express = require("express");
const router = express.Router();

// importing function from the controller
const {
  newUser,
  getAllUsers,
  updateUser,
  deleteUserByID,
} = require("./controllers/userController");

// New User
router.route("/new").post(newUser);

// TODO: Private/Admin - Get All User
router.route("/all").get(getAllUsers);

// TODO: Private - Update User b y ID
router.route("/update/:id").put(updateUser);

// TODO: Private\Admin - Update User b y ID
router.route("/delete/:id").delete(deleteUserByID);

// Export Router
module.exports = router;
