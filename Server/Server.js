// Setup Express
const express = require("express");
const app = express();

// Run backend server
const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "Server/config/config.env" });

app.get("/", (req, res) => res.send("hello"));

app.listen(process.env.PORT, () =>
  console.log(
    `The server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

module.exports = app;
