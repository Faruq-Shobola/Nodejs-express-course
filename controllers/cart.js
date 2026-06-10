const Cart = require("./../models/cart");

const getCart = (req, res, next) => {
  res.render("cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const qty = req.body.quantity;

  Cart.addProduct(prodId, qty);
  res.redirect("/cart");
};

module.exports = {
  getCart,
  postCart
};
