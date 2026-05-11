const path = require('path')

const express = require("express");
const productController = require('./../controllers/product')

const router = express.Router();

router.get("/", productController.displayHomeDetails);

router.post("/shop", productController.getAllProducts);

module.exports = router;
