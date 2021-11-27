const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../utils/authCheck");

const {
  processPayment,
  sendStripeAPI,
} = require("./controllers/paymentController");

// Process Payment
router.route("/process").post(isAuthenticatedUser, processPayment);

// Sent API Key
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeAPI);

module.exports = router;
