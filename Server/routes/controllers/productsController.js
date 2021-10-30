const Product = require("../../models/productSchema");
// TODO: const productFeatures = require("../../utils/productFeatures");
// TODO: const ErrorHandler = require("../../validations/errorHandler");
// TODO: const asyncErrors = require("../../validations/asyncErrors");

// note: add these routes in:
// todo: updateProductByID,
// todo: createProductReview,
// todo: getProductReviews,
// todo: deleteReview,
// todo: getAdminProducts,

// @route   POST /products/new
// @desc    Create New Product
// TODO: @access  Private/Admin
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
// @access  Public
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
// @access  Public
exports.getProductByID = async (req, res, next) => {
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
};

// @route   DELETE /products/delete/:id
// @desc    Display All Products
// TODO: @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
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
};

// @route   PUT /products/update/:id
// @desc    Update Product by ID
// TODO: @access  Private/Admin
exports.updateProductByID = async (req, res, next) => {
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
};
