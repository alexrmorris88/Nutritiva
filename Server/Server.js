// Setup Express
const express = require("express");
const app = express();

// Config Path
const dotenv = require("dotenv");
dotenv.config({ path: "Server/config/config.env" });

// Mongo DB Connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Database (MongoDB)"))
  .catch((err) => console.log(err));

// Run backend Server
dotenv.config({ path: "Server/config/config.env" });

app.listen(process.env.PORT, () =>
  console.log(
    `The server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

// Export Server
module.exports = app;
