const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../utils/authCheck");

const {
  newOrder,
  getSingleOrder,
  allOrders,
  getUserOrders,
  deleteOrder,
  findOrderByID,
} = require("./controllers/orderController");

// New Order
router.route("/new").post(isAuthenticatedUser, newOrder);

// Get a single Order by ID
router.route("/id/:id").get(isAuthenticatedUser, getSingleOrder);

// Get all Orders
router
  .route("/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

// Get User Orders by User ID
router.route("/user/:id").get(isAuthenticatedUser, getUserOrders);

// Delete Order
router.route("/delete/:id").delete(isAuthenticatedUser, deleteOrder);

// Update Order
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), findOrderByID);

module.exports = router;
