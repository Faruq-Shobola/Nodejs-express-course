const Product = require("./../models/product");

const getProduct = (req, res, next) => {
  const productId = req.params.productId;

  const product = Product.findById(productId)

    .then((product) => {
      if (product == null) {
        res.render("404", { docTitle: "404 Not Found", path: "/404" });
      }

      res.render("product", {
        docTitle: "Product Page",
        path: "/shop",
        product: product, // {}
      });
    })
    .catch((err) => console.log(err));
};

const saveProduct = (req, res, next) => {
  const { title, category, price, image, description } = req.body;

    const newProduct = new Product(title, price, image, category, description)
    newProduct.save()
    .then((result) => {
      res.redirect("/shop");
    })
    .catch((err) => console.log(err));
};

const getAllProducts = (req, res, next) => {
  const products = Product.fetchAll()
    .then((products) => {
      res.render("shop", {
        docTitle: "Shop Page",
        products: products,
        path: "/shop",
      });
    })
    .catch((err) => console.log(err));
};

const displayHomeDetails = (req, res, next) => {
  res.render("home", { docTitle: "Home Page", path: "/" });
};

const getDashbord = (req, res, next) => {
  res.render("admin/dashboard", {
    docTitle: "Dashboard",
    path: "/dashboard",
  });
};

const getProducts = (req, res, next) => {
  const products = Product.findAndCountAll({
    attributes: ["id", "title", "category", "price", "imageUrl"],
    order: [["createdAt", "DESC"]],
    where: {userId: req.user.id}
  })
    .then((products) => {
      res.render("admin/products", {
        docTitle: "Products Page",
        path: "/products",
        products: products.rows,
        total: products.count,
      });
    })
    .catch((err) => console.log(err));
};

const addProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product Page",
    path: "/add-product",
  });
};

const getOrders = (req, res, next) => {
  res.render("admin/orders", {
    docTitle: "Orders Page",
    path: "/orders",
  });
};

/******  ADMIN FUNCTIONALITY ********* */

const editProduct = (req, res, next) => {
  const productId = req.params.productId;
  const product = Product.findByPk(productId)

    .then((product) => {
      if (product == null) {
        res.render("404", { docTitle: "404 Not Found", path: "/404" });
      }

      res.render("admin/edit-product", {
        docTitle: "Edit Producut Page",
        path: "/products",
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const { title, category, price, image, description } = req.body;

  const product = Product.findByPk(productId)

    .then((product) => {
      if (product == null) {
        res.render("404", { docTitle: "404 Not Found", path: "/404" });
      }

      product.title = title;
      product.category = category;
      product.price = price;
      product.imageUrl = image;
      product.description = description;

      return product.save();
    })
    .then((result) => {
      console.log("Porduct Update Successfully", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  const product = Product.findByPk(productId)

    .then((product) => {
      if (product == null) {
        res.render("404", { docTitle: "404 Not Found", path: "/404" });
      }
      return product.destroy()
    }).then((result)=>{
      console.log("Porduct Deleted Successfully")
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProduct,
  addProduct,
  getAllProducts,
  saveProduct,
  displayHomeDetails,
  getDashbord,
  getProducts,
  getOrders,
  editProduct,
  postEditProduct,
  postDeleteProduct
};
