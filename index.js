const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const fetch = require("node-fetch");
var CryptoJS = require("crypto-js");

const app = express();
const facebookAccessTokenKey = "X-FacebookAccessToken";

const app_secret = process.env.FACEBOOK_API_SECRET;

app.use(helmet());
app.use(cors());

app.get("/authenticateFacebook", (req, res) => {
  const facebookAccessToken = req.get(facebookAccessTokenKey);
  if (!facebookAccessToken) {
    return res.status(400).send();
  }

  appsecret_proof = CryptoJS.HmacSHA256(facebookAccessToken, app_secret);
  fetch(
    `https://graph.facebook.com/me?fields=email,name,picture&access_token=${facebookAccessToken}&appsecret_proof=${appsecret_proof}`
  )
    .then(response => {
      response.json().then(body => {
        res.status(200).send({
          email: body.email,
          name: body.name,
          picture: body.picture.data
        });
      });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.get("*", (req, res) => {
  res.send("Just another test server");
});

if (process.env.PORT) {
  app.listen(process.env.PORT, () =>
    console.log(`app listening on port ${process.env.PORT}`)
  );
} else {
  app.listen();
}

module.exports = app;
