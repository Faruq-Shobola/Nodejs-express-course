const path = require('path')

const express = require("express");
const productController = require('./../controllers/product')

const router = express.Router();

router.get("/", productController.displayHomeDetails);

router.get("/shop", productController.getAllProducts);

router.get("/products/author", (req, res,) => {
    res.render('home', { docTitle: "Home Page", path: "/" })
})

router.get("/products/:productId", productController.getProduct);

module.exports = router;
