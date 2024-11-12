var express = require('express');
var app = express();

assets = [
  app.use("/css", express.static(__dirname+"/../public/stylesheets")),
  app.use("/js", express.static(__dirname+"/../public/javascripts")),
  app.use("/img", express.static(__dirname+"/../public/images")),
]

module.exports = assets;