const mongodb = require('mongodb')
const { getDB } = require("./../utils/database");

class Product {
  constructor(title, price, imageUrl, category, description) {
    ((this.title = title),
      (this.price = price),
      (this.imageUrl = imageUrl),
      (this.category = category),
      (this.description = description));
  }

  save() {
    let db = getDB();
    return db
      .collection("products")
      .insertOne({
        title: this.title,
        price: this.price,
        imageUrl: this.imageUrl,
        catagory: this.category,
        description: this.description,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    let db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    let db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
