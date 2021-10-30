const express = require("express");
const router = express.Router();

// importing function from the controller
const { newProduct } = require("./controllers/productsController");

// New Product
router
  .route("/new")
  .post(newProduct);

// Export Router
module.exports = router;
