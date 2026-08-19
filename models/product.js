const mongodb = require("mongodb");
const { getDB } = require("./../utils/database");

class Product {
  constructor(title, price, imageUrl, category, description, id) {
    ((this.title = title),
      (this.price = price),
      (this.imageUrl = imageUrl),
      (this.category = category),
      (this.description = description),
      (this._id = id ? new mongodb.ObjectId(id) : null));
  }

  save() {
    let db = getDB();
    let dbOperation;

    if (this._id) {
      dbOperation = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation
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

  static deleteById(prodId) {
    let db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
