const path = require('path')

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render('home', {docTitle: 'Home Page'})
});

router.get("/shop", (req, res, next) => {
  res.render('home', {docTitle: 'Shop Page'});
});

module.exports = router;
