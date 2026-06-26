const Product = require('./product')

const cart = {
    products: [],
    totalPrice: 0
}


class Cart {
    static addProduct(id, qty) {
        const productId = id.toString();
        const existingProductIndex = cart.products.findIndex(
            (product) => product.id.toString() === productId
        )
        const existingProduct = cart.products[existingProductIndex];

        if(existingProduct) {
            existingProduct.qty += +qty
        } else {
            cart.products.push({id: productId, qty: +qty})
        }
        this.calculateTotalPrice()
    }

    static increaseProduct(id) {
        const productId = id.toString();
        const existingProductIndex = cart.products.findIndex(
            (product) => product.id.toString() === productId
        )
        if (existingProductIndex !== -1){
            cart.products[existingProductIndex].qty += 1
        }
        this.calculateTotalPrice()
    }

    static decreaseProduct(id) {
        const productId = id.toString();
        const existingProductIndex = cart.products.findIndex(
            (product) => product.id.toString() === productId
        )
        if (existingProductIndex !== -1){
            const existingProduct = cart.products[existingProductIndex]
            if(existingProduct.qty > 1) {
                existingProduct.qty -= 1
            } else {
                cart.products.splice(existingProductIndex, 1)
            }
            
        }
        this.calculateTotalPrice()
    }

    static deleteProduct(id) {
        const productId = id.toString();
        const existingProductIndex = cart.products.findIndex(
            (product) => product.id.toString() === productId
        )
        if (existingProductIndex !== -1) {
             cart.products.splice(existingProductIndex, 1)
        }
        this.calculateTotalPrice()
    }

    static getCart() {
        return cart;
    }

    static calculateTotalPrice() {
        let price = 0
        for(let p of cart.products) {
            const prodDetails = Product.findById(p.id)
            if(prodDetails) {
                price += (+prodDetails.price) * p.qty
            }
        }
        cart.totalPrice = price
    }
}

module.exports = Cart