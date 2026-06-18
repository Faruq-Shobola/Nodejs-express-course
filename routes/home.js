const path = require('path')

const express = require("express");
const productController = require('./../controllers/product')
const cartController = require('./../controllers/cart')

const router = express.Router();

router.get("/", productController.displayHomeDetails);

router.get("/shop", productController.getAllProducts);

router.get("/products/author", (req, res,) => {
    res.render('home', { docTitle: "Home Page", path: "/" })
})

router.get("/products/:productId", productController.getProduct);


// cart route
router.get("/cart", cartController.getCart);
router.post("/cart", cartController.postCart);
router.post('/cart/increase', cartController.postCartIncrease)

module.exports = router;
