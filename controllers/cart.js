const Cart = require("./../models/cart");
const Product = require("./../models/product")

const getCart = (req, res, next) => {
    const cart = Cart.getCart();

    const cartProducts = []

    for(let item of cart.products) {
        const product = Product.findById(item.id)
        if(product) {
            cartProducts.push({productData: product, qty: item.qty })
        }
    }

  res.render("cart", {
    docTitle: "Your Cart",
    path: "/cart",
    products: cartProducts
  });
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const qty = req.body.quantity;

  Cart.addProduct(prodId, qty);
  res.redirect("/cart");
};

const postCartIncrease = (req, res, next) => {
  const prodId = req.body.productId
  Cart.increaseProduct(prodId)
  res.redirect('/cart')
}

module.exports = {
  getCart,
  postCart,
  postCartIncrease
};
