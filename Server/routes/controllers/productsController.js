const Product = require("../../models/productSchema");
// const productFeatures = require("../../utils/productFeatures");
const ErrorHandler = require("../../errorHandling/ErrorHandler");
const asyncErrors = require("../../errorHandling/aysncErrors");

// note: add these routes in:
// todo: createProductReview,
// todo: getProductReviews,
// todo: deleteReview,

// @route   POST /products/new
// @desc    Create New Product
// @access  Private/Admin
exports.newProduct = asyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body)
    .then((product) =>
      res.status(201).json({
        success: true,
        product,
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   GET /products/all
// @desc    Display All Products
// @access  Public
exports.allProducts = asyncErrors(async (req, res, next) => {
  const product = await Product.find()
    .then((product) =>
      res.status(201).json({
        success: true,
        product,
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   GET /products/:id
// @desc    Get Product by ID
// @access  Public
exports.getProductByID = asyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).catch((err) =>
    res.status(404).json(err.message)
  );

  if (!product) {
    return next(
      res.status(404).json({
        success: false,
        error: "Product does not exist",
      })
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @route   DELETE /products/delete/:id
// @desc    Display All Products
// @access  Private/Admin
exports.deleteProduct = asyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).catch((err) =>
    res.status(404).json(err.message)
  );

  if (!product) {
    return next(
      res.status(404).json({
        success: false,
        error: "Product does not exist",
      })
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
  });
});

// @route   PUT /products/update/:id
// @desc    Update Product by ID
// @access  Private/Admin
exports.updateProductByID = asyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id).catch((err) =>
    res.status(404).json(err.message)
  );

  if (!product) {
    return next(
      res.status(404).json({
        success: false,
        error: "Product does not exist",
      })
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
    .then((product) =>
      res.status(200).json({
        success: true,
        product,
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   GET /products/admin/all/
// @desc    Update Product by ID
// @access  Private/Admin
exports.getAdminProducts = asyncErrors(async (req, res, next) => {
  let product = await Product.find()
    .then((product) =>
      res.status(200).json({
        success: true,
        product,
      })
    )
    .catch((err) => res.status(404).json(err.message));
});

// @route   POST /products/reviews/create
// @desc    Create Product Reviews
// FIXME: @access  Private
exports.createProductReviews = asyncErrors(async (req, res, next) => {


});