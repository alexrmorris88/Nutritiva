const Product = require("../../models/productSchema");
const APIFeatures = require("../../utils/APIFeatures");
const asyncErrors = require("../../errorHandling/aysncErrors");

// @route   POST /products/new
// @desc    Create New Product
// @access  Private/Admin
exports.newProduct = asyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

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
  try {
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    const ApiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resPerPage);

    let product = await ApiFeatures.query;
    let filteredProductsCount = product.length;

    res.status(201).json({
      success: true,
      productsCount,
      filteredProductsCount,
      resPerPage,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "There are no products available",
    });
  }
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
// @desc    Get Admin Products
// @access  Private/Admin
exports.getAdminProducts = asyncErrors(async (req, res, next) => {
  const ApiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(8);

  const product = await ApiFeatures.query;

  res.status(200).json({
    success: true,
    product,
  });

  if (!product) {
    res.status(400).json({
      success: false,
      message: "There are no products available",
    });
  }
});

// @route   POST /products/reviews/create
// @desc    Create Product Reviews
// @access  Private
exports.createProductReviews = asyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    rating,
    comment,
  });
});

// @route   GET /products/reviews/:id
// @desc    Get Product Reviews by ID
// @access  Private
exports.getProductReviews = asyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error",
    });
  }
});

// @route   DELETE /products/reviews
// @desc    Delete Product Reviews by ID
// @access  Private
exports.deleteReview = asyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
