const products = [{id: 1, title: "Sofa"}, {id: 2, title: "Chair"}];
let nextProuctId = 3

class Product {
  constructor(title) {
    this.id = nextProuctId++ // nextProductId = nextProductId + 1
    this.title = title;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }

  static findById(id) {
    return products.find((product) => product.id.toString() === id)
  }
}

module.exports = Product;