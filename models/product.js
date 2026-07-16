const db = require('./../utils/database')

class Product {
  constructor(title, category, price, imageURL, description) {
    this.id = nextProuctId++; // nextProductId = nextProductId + 1
    this.title = title;
    this.category = category;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
    return products.find((product) => product.id.toString() === id);
  }
}

module.exports = Product;
