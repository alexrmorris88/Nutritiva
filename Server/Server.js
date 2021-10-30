const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("hello"));

const port = process.env.PORT;

app.listen(port, () => console.log(`The server is running on port ${port}`));