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
    }

    static getCart() {
        return cart;
    }
}

module.exports = Cart