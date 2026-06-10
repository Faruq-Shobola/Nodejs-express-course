const getCart = (req, res, next) => {
    res.render("cart", {
        docTitle: "Your Cart",
        path: "/cart"
    });
}


module.exports = {
    getCart,
}