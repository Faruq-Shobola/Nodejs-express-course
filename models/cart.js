const cart = {
    products: [],
    totalPrice: 0
}


class Cart {
    static addProduct(id, qty) {
        const productId = id.toString();

        cart.products.push({id: productId, qty: +qty})
        console.log(cart)
    }

    static getCart() {
        return cart;
    }
}

module.exports = Cart