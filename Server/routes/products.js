const express = require("express");
const router = express.Router();

// importing function from the controller
const {
  newProduct,
  allProducts,
  deleteProduct,
  getProductByID,
} = require("./controllers/productsController");

// New Product
router.route("/new").post(newProduct);

// All Products
router.route("/all").get(allProducts);

// Get Product by ID
router.route("/:id").get(getProductByID);

// Delete Product
router.route("/delete/:id").delete(deleteProduct);

// Export Router
module.exports = router;
