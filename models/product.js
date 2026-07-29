const db = require('./../utils/database')

class Product {
  constructor(title, category, price, imageURL, description) {
    this.title = title;
    this.category = category;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description, category) VALUES (?,?,?,?,?)', 
      [this.title, this.price, this.imageURL, this.description,this.category])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
}

module.exports = Product;
