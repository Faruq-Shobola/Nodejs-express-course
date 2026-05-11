const Product = require("./../models/product");

const getProducts = (req, res, next) => {

  const product = new Product(req.body.title);
  product.save();

  const products = Product.fetchAll();

  res.render("shop", {
    docTitle: "Product Page",
    products: products,
    path: "/shop",
  });
};

const addProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product Page",
    path: "/add-product",
  });
};

const getAllProducts = (req, res, next) => {

  const products = Product.fetchAll();

  res.render("shop", {
    docTitle: "Shop Page",
    products: products,
    path: "/shop",
  });
};

const displayHomeDetails = (req, res, next) => {
  res.render("home", { docTitle: "Home Page", path: "/" });
};

module.exports = {
  getProducts,
  addProduct,
  getAllProducts,
  displayHomeDetails,
};
