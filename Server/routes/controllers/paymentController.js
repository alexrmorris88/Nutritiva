const asyncErrors = require("../../errorHandling/aysncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @route   POST /payment/process
// @desc    Process Payments
// @access  Private
exports.processPayment = asyncErrors(async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",

      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot connect",
    });
  }
});

// @route   GET /payment/stripeapi
// @desc    Send Stripe API Key
// @access  Private
exports.sendStripeAPI = asyncErrors(async (req, res, next) => {
  try {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot connect",
    });
  }
});
