// const Cart = require("./../models/cart");
const Product = require("./../models/product");
const Order = require("./../models/order");

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

const postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/admin/orders");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getCart,
  postCart,
  postCartIncrease,
  postCartDecrease,
  postDelete,
  postOrder,
};
