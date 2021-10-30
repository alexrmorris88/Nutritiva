const Product = require("../../models/productSchema");
// const productFeatures = require("../../utils/productFeatures");
// const ErrorHandler = require("../../validations/errorHandler");
// const asyncErrors = require("../../validations/asyncErrors");

// @route   POST /products/new
// @desc    Create New Product
// @access  Private
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body)
    .then((product) =>
      res.status(201).json({
        success: true,
        product,
      })
    )
    .catch((err) => res.status(404).json(err.message));
};
