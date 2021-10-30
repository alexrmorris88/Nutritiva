const express = require("express");
const router = express.Router();

// importing function from the controller
const {
  newProduct,
  allProducts,
  deleteProduct,
  getProductByID,
  updateProductByID,
  getAdminProducts,
  createProductReviews,
} = require("./controllers/productsController");

// TODO: Private/Admin - New Product
router.route("/new").post(newProduct);

// All Products
router.route("/all").get(allProducts);

// Get Product by ID
router.route("/:id").get(getProductByID);

// TODO: Private/Admin - Delete Product by ID
router.route("/delete/:id").delete(deleteProduct);

// TODO: Private/Admin - Update Product by ID
router.route("/update/:id").put(updateProductByID);

// TODO: Private/Admin - Get All Admin Products
router.route("/admin/all").get(getAdminProducts);

// TODO: FIXME: Private - Create Product Reviews
router.route("/reviews/create").post(createProductReviews);

// Export Router
module.exports = router;
