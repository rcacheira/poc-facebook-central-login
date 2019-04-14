const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const fetch = require("node-fetch");
var CryptoJS = require("crypto-js");

const app = express();
const facebookAccessTokenKey = "X-FacebookAccessToken";

const app_secret = "51fb0f8ee442d9f6e32b2388c195c97d";

app.use(helmet());
app.use(cors());

app.get("/authenticate", (req, res) => {
  const facebookAccessToken = req.get(facebookAccessTokenKey);
  if (!facebookAccessToken) {
    return res.status(400).send();
  }

  appsecret_proof = CryptoJS.HmacSHA256(facebookAccessToken, app_secret);
  fetch(
    `https://graph.facebook.com/me?fields=email,name,picture&access_token=${facebookAccessToken}&appsecret_proof=${appsecret_proof}`
  ).then(response => {
    response.json().then(body => {
      res.status(200).send({
        email: body.email,
        name: body.name,
        picture: body.picture.data
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("Just another test server");
});

app.listen();

module.exports = app;
