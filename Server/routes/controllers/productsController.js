const Product = require("../../models/productSchema");
// const productFeatures = require("../../utils/productFeatures");
// const ErrorHandler = require("../../validations/errorHandler");
// const asyncErrors = require("../../validations/asyncErrors");

// @route   POST /products/new
// @desc    Create New Product
// TODO: @access  Private 
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

// @route   GET /products/all
// @desc    Display All Products
// TODO: @access  Private
exports.allProducts = async (req, res, next) => {
  const product = await Product.find()
    .then((product) =>
      res.status(201).json({
        success: true,
        product,
      })
    )
    .catch((err) => res.status(404).json(err.message));
};

// @route   GET /products/:id
// @desc    Get Product by ID
// TODO: @access  Private
exports.getProductByID = async (req, res, next) => {

  const product = await Product.findById(req.params.id)
    .catch((err) => res.status(404).json(err.message));

  if (!product) {
    return next(res.status(404).json({
      success: false,
      error: "Product does not exist"
    }))
  };

  res.status(200).json({
    success: true,
    product
  })

};

// @route   DELETE /products/delete/:id
// @desc    Display All Products
// TODO: @access  Private
exports.deleteProduct = async (req, res, next) => {

  const product = await Product.findById(req.params.id)
    .catch((err) => res.status(404).json(err.message));

  if (!product) {
    return next(res.status(404).json({
      success: false,
      error: "Product does not exist"
    }))
  };

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product successfully deleted"
  })

};