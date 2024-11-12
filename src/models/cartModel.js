const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "produuct"},
    count: Number
});

const CartModel = mongoose.model("cart", CartSchema)

module.exports = CartModel