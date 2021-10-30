const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: {
    type: Number,
    required: [true, "Please enter product sku"],
    maxLength: [20, "SKU cannot exceed 20 characters"],
  },
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  category: {
    type: String,
    required: [false, "Please select a category for this product"],
    categories: {
      values: ["Powder", "Tablets", "Capsules", "Gummies"],
      message: "Please select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [false, "Please enter product seller"],
    default: "Nutritiva",
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
