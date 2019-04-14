const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());

app.get("*", (req, res) => {
  res.send({
    "X-FacebookAccessToken": req.header["X-FacebookAccessToken"]
  });
});

module.exports = app;
