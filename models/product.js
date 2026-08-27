const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
