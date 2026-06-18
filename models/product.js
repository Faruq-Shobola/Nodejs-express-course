const products = [
  {
    id: 1,
    title: "Sofa",
    category: "outdoor",
    price: "340",
    imageURL: "https://image.com",
    description:
      "The Oslo Lounge Chair combines Scandinavian simplicity with exceptional comfort. Crafted from solid oak with a natural matte finish, it features premium linen upholstery and high-density foam cushioning. The wide seat and gently curved armrests make this the perfect reading or relaxation chair for any living space.",
  },
  {
    id: 2,
    title: "Chair",
    category: "outdoor",
    price: "340",
    imageURL: "https://image.com",
    description:
      "The Oslo Lounge Chair combines Scandinavian simplicity with exceptional comfort. Crafted from solid oak with a natural matte finish, it features premium linen upholstery and high-density foam cushioning. The wide seat and gently curved armrests make this the perfect reading or relaxation chair for any living space.",
  },
  {
    id: 3,
    title: "Green Couch",
    category: "living-room",
    price: "120",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKxNC-U1JE-65Jo11KNnLj3tRNbcn2szMtpw&s",
    description: "A comfortable Couch",
  },
];
let nextProuctId = 3;

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
    return products;
  }

  static findById(id) {
    return products.find((product) => product.id.toString() === id);
  }
}

module.exports = Product;
