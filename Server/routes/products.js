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
} = require("./controllers/productsController");

// Private/Admin - New Product
router.route("/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// All Products
router.route("/all").get(allProducts);

// Get Product by ID
router.route("/:id").get(getProductByID);

// Private/Admin - Delete Product by ID
router.route("/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Private/Admin - Update Product by ID
router.route("/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProductByID);

// Private/Admin - Get All Admin Products
router.route("/admin/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// FIXME: Private - Create Product Reviews
router.route("/reviews/create").post(isAuthenticatedUser, createProductReviews);

// Export Router
module.exports = router;
