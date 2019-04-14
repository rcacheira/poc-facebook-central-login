const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());

app.get("*", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(
    200,
    `
        <h1><marquee direction=right>Hello from Express path '/' on Now 2.0!</marquee></h1>
        <h2>Go to <a href="/about">/about</a></h2>
    `
  );
});

module.exports = app;
