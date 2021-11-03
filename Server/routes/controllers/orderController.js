const Orders = require("../../models/orderSchema");
const asyncErrors = require("../../errorHandling/aysncErrors");
const ErrorHandler = require("../../errorHandling/ErrorHandler");
const sendToken = require("../../utils/jwtTokenCookie");

// @route   POST /orders/new
// @desc    Create New Order
// @access  Private
exports.newOrder = asyncErrors(async (req, res, next) => {
  const { orderItems } = req.body;

  const order = await Orders.create({
    orderItems,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// @route   GET /orders/:id
// @desc    Get a Single Order by ID
// @access  Private
exports.getSingleOrder = asyncErrors(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  if (!order) {
    return next(
      res.status(404).json({
        success: false,
        error: "Order does not exist",
      })
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// @route   GET /orders/all
// @desc    Get all orders
// @access  Private/Admin
exports.allOrders = asyncErrors(async (req, res, next) => {
  const orders = await Orders.find()
    .then((order) =>
      res.status(200).json({
        totalOrders: order.length,
        success: true,
        order,
      })
    )
    .catch((err) => res.status(404).json(err.message));

  if (!orders) {
    return res.status(404).json({
      success: false,
      message: "No orders available",
    });
  }
});

// @route   GET /orders/
// @desc    Get User Orders
// @access  Private
exports.getUserOrders = asyncErrors(async (req, res, next) => {
  const orders = await Orders.find({ user: req.user.id });

  if (orders.length === 0) {
    return next(
      res.status(400).json({
        success: false,
        error: "You have no orders!",
      })
    );
  }

  res
    .status(200)
    .json({
      totalOrders: orders.length,
      success: true,
      orders,
    })
});

// @route   DELETE /delete/:id
// @desc    Delete an order
// @access  Private
exports.deleteOrder = asyncErrors(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  order.remove()

  res.status(200).json({
    success: true,
    message: "Order has been deleted"
  });

})

