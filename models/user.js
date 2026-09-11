const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((productIndex) => {
    return productIndex.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1; /// item[0]
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.adjustCart = function (productId, action) {
  const cartProductIndex = this.cart.items.findIndex((productIndex) => {
    return productIndex.productId.toString() === productId.toString();
  });

  const existingProduct = this.cart.items[cartProductIndex];

  if (cartProductIndex >= 0) {
    if (action == "decrease") {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        this.cart.items.splice(cartProductIndex, 1);
      }
    } else {
      existingProduct.quantity += 1;
    }
  }

  return this.save();
};

module.exports = mongoose.model("User", userSchema);
