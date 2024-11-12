const CartModel = require("../models/cartModel")

const getCartItems = (req, res) => {
    res.send("All cart items")
}

const AddToCart = (req, res) => {
    const cartItem = new CartModel({user: req.user._id, product: req.body.product, count: req.body.count})
    cartItem.save()
    .then((cart) => {
        res.json(cart)
    }).catch(err => {
        console.log("Error")
        res.status(400).json(err)
    })
}

module.exports = {getCartItems, AddToCart}