const path = require("path");

const express = require("express");

const router = express.Router();

const products = [];

router.post("/products", (req, res, next) => {
  products.push({title: req.body.title})
  res.render("product", {
    docTitle: "Product Page",
    products: products,
    hasProducts: products.length > 0 ? true : false,
  });
});

router.get("/add-product", (req, res, next) => {
  res.render("add-product", { docTitle: "Add Product Page" });
});

module.exports = router;
