// Setup Express
const express = require("express");
const app = express();

// Run backend server
const dotenv = require("dotenv");
dotenv.config({ path: "Server/config/config.env" });

app.listen(process.env.PORT, () =>
  console.log(
    `The server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

module.exports = app;
