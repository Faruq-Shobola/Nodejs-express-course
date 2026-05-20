const path = require("path");

const express = require("express");
const productController = require('./../controllers/product')

const router = express.Router();

router.post("/add-product", productController.saveProduct)

router.get("/add-product", productController.addProduct);

module.exports = router;
