const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../utils/authCheck");

const {
  newOrder,
  getSingleOrder,
  allOrders,
  getUserOrders,
  deleteOrder
} = require("./controllers/orderController");

// New Order
router.route("/new").post(isAuthenticatedUser, newOrder);

// Get a single Order by ID
router.route("/id/:id").get(isAuthenticatedUser, getSingleOrder);

// Get all Orders
router
  .route("/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

// Get User Orders
router
.route("/user")
.get(isAuthenticatedUser, getUserOrders);

// Delete Order
router
.route("/delete/:id")
.delete(isAuthenticatedUser, deleteOrder);


module.exports = router;
