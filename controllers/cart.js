// const Cart = require("./../models/cart");
const Product = require("./../models/product");

const getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").then((user) => {
    const totalPrice = user.calculateTotalPrice();
    res.render("cart", {
      docTitle: "Your Cart",
      path: "/cart",
      products: user.cart.items,
      totalPrice: totalPrice,
    });
  });
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const quantity = req.body.quantity ? req.body.quantity : 1;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product, quantity);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

const postCartIncrease = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.adjustCart(prodId, "increase").then(() => {
    res.redirect("/cart");
  });
};

const postCartDecrease = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.adjustCart(prodId, "decrease").then(() => {
    res.redirect("/cart");
  });
};

const postDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId).then(() => {
    res.redirect("/cart");
  });
};

module.exports = {
  getCart,
  postCart,
  postCartIncrease,
  postCartDecrease,
  postDelete,
};
