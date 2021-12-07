// Setup Express
const express = require("express");
const app = express();

// Config Path
const dotenv = require("dotenv");
dotenv.config({ path: "Server/config/config.env" });

// Body Parser Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Import the Routes
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const payment = require("./routes/payment");

// Error Middleware
const errorMiddleware = require("./errorHandling/errorMiddleware");
app.use(errorMiddleware);

// Mongo DB Connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Database (MongoDB)"))
  .catch((err) => console.log(err));

// Use Routes
app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);
app.use("/payment", payment);

// Static Files Middleware
app.use(express.static("public"));

// Handling "Undhandled Promise Rejections"
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Undhandled Promise Rejections");
  server.close(() => {
    process.exit(1);
  });
});

// Run backend Server
dotenv.config({ path: "Server/config/config.env" });

app.listen(process.env.PORT, () =>
  console.log(
    `The server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

// Export Server
module.exports = app;
