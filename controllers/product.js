const products = [];

const getProducts = (req, res, next) => {
  products.push({title: req.body.title})
  res.render("product", {
    docTitle: "Product Page",
    products: products,
  });
}

const addProduct = (req, res, next) => {
  res.render("add-product", { docTitle: "Add Product Page" });
}

const getAllProducts = (req, res, next) => {
  res.render('home', {docTitle: 'Home Page'})
}

module.exports = {
    getProducts,
    addProduct,
    getAllProducts
}