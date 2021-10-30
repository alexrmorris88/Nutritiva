const express = require("express");
const router = express.Router();

// importing function from the controller
const {
  newProduct,
  allProducts,
  deleteProduct,
  getProductByID,
  updateProductByID,
} = require("./controllers/productsController");

// New Product
router.route("/new").post(newProduct);

// All Products
router.route("/all").get(allProducts);

// Get Product by ID
router.route("/:id").get(getProductByID);

// Delete Product by ID
router.route("/delete/:id").delete(deleteProduct);

// Update Product by ID
router.route("/update/:id").put(updateProductByID);

// Export Router
module.exports = router;
