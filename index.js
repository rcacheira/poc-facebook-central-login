const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());

app.get("*", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(req.header["X-FacebookAccessToken"]);
});

module.exports = app;
