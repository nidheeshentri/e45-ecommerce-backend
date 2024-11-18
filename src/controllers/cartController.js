const CartModel = require("../models/cartModel")

const getCartItems = async (req, res) => {
    let user = req.user
    console.log('Cookies: ', req.cookies)
    let cartItems = await CartModel.find({user: user._id}).populate('product')
    console.log(cartItems)
    res.status(200).json({cartItems: cartItems})
    // res.send("All cart items")
}

const updateCartItemCount = async (req, res) => {
    let count = req.body.count
    let cartItemId = req.body.cartItemId

    if (count>0){
        let cartItem = await CartModel.findById(cartItemId)
        cartItem.count = count
        cartItem.save()
        .then(cart => {
            res.status(200).json({cartItem: cart})
        })
        .catch(err =>{
            res.status(400).json({message: "Bad request. Try again", error: err})
        })
    }
    else{
        CartModel.findOneAndDelete({ _id: cartItemId })
        .then(()=>{
            res.status(200).json({message: "Deleted successfully"})
        })
        .catch(()=>{
            res.status(400).json({message: "Bad request"})
        })
    }
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

module.exports = {getCartItems, AddToCart, updateCartItemCount}