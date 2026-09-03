// const Cart = require("./../models/cart");
const Product = require("./../models/product");

const getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").then((user) => {
    res.render("cart", {
      docTitle: "Your Cart",
      path: "/cart",
      products: user.cart.items,
      // totalPrice: cart.totalPrice,
    });
  });

};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("Product Added to cart", result);
      res.redirect("/cart");
    });
};

const postCartIncrease = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.increaseProduct(prodId);
  res.redirect("/cart");
};

const postCartDecrease = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.decreaseProduct(prodId);
  res.redirect("/cart");
};

const postDelete = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.deleteProduct(prodId);
  res.redirect("/cart");
};

module.exports = {
  getCart,
  postCart,
  postCartIncrease,
  postCartDecrease,
  postDelete,
};
