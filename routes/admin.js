const path = require("path");

const express = require("express");
const productController = require('./../controllers/product')

const router = express.Router();

router.post("/products", productController.getProducts);

router.get("/add-product", productController.addProduct);

module.exports = router;
