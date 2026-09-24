const express = require("express");
const productController = require("./../controllers/product");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/dashboard", isAuth, productController.getDashbord);

router.get("/products", isAuth, productController.getProducts);

router.get("/orders", isAuth, productController.getOrders);

router.post("/add-product", isAuth, productController.saveProduct);

router.get("/products/:productId/edit", isAuth, productController.editProduct);

router.post(
  "/products/:productId/edit",
  isAuth,
  productController.postEditProduct,
);

router.post(
  "/products/:productId/delete",
  isAuth,
  productController.postDeleteProduct,
);

router.get("/add-product", isAuth, productController.addProduct);

module.exports = router;
