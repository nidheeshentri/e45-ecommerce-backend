const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number,
    discount: Number
});

const ProductModel = mongoose.model("produuct", ProductSchema)

module.exports = ProductModel