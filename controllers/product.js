const Product = require("./../models/product");

const getProduct = (req, res, next) => {

  const productId = req.params.productId

  const product = Product.findById(productId)

  console.log(product)

  if(product == undefined) {
    res.render("404", { docTitle: "404 Not Found", path:'/404' })
  }

  res.render("product", {
    docTitle: "Product Page",
    path: "/shop",
    product: product
  });
};

const saveProduct = (req, res, next) => {

  const product = new Product(req.body.title);
  product.save();

  const products = Product.fetchAll();

  res.render("shop", {
    docTitle: "Product Page",
    products: products,
    path: "/shop",
  });
}

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

const getDashbord = (req, res, next) => {
  res.render('admin/dashboard', {
    docTitle: "Dashboard",
    path: "/dashboard",
  })
}

const getProducts = (req, res, next) => {
  res.render('admin/products', {
    docTitle: "Products Page",
    path: "/products",
  })
}

const addProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product Page",
    path: "/add-product",
  });
};

const getOrders = (req, res, next) => {
  res.render('admin/orders', {
    docTitle: "Orders Page",
    path: "/orders",
  })
}

module.exports = {
  getProduct,
  addProduct,
  getAllProducts,
  saveProduct,
  displayHomeDetails,
  getDashbord,
  getProducts,
  getOrders
};
