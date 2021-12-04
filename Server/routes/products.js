const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../utils/authCheck");

// importing function from the controller
const {
  newProduct,
  allProducts,
  deleteProduct,
  getProductByID,
  updateProductByID,
  getAdminProducts,
  createProductReviews,
  getProductReviews,
  deleteReview,
} = require("./controllers/productsController");

// Private/Admin - New Product
router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// All Products
router.route("/all").get(allProducts);

// Get Product by ID
router.route("/:id").get(getProductByID);

// Private/Admin - Delete Product by ID
router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Private/Admin - Update Product by ID
router
  .route("/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductByID);

// Private/Admin - Get All Admin Products
router
  .route("/admin/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// Private - Create Product Reviews
router.route("/reviews/create").put(isAuthenticatedUser, createProductReviews);

// Private - Create/Delete Product Reviews
router.route("/reviews/:id").get(isAuthenticatedUser, getProductReviews);

// Private - Delete Product Reviews
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

// Export Router
module.exports = router;
