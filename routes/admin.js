const path = require("path");

const express = require("express");
const productController = require('./../controllers/product')

const router = express.Router();

router.get('/dashboard', productController.getDashbord)

router.get('/products', productController.getProducts)

// router.get('/orders', productController.getOrders)

router.post("/add-product", productController.saveProduct)

router.get("/products/:productId/edit", productController.editProduct)

router.post("/products/:productId/edit", productController.postEditProduct)

// router.post("/products/:productId/delete", productController.postDeleteProduct)

router.get("/add-product", productController.addProduct);

module.exports = router;
