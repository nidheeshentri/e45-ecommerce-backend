const ProductModel = require("../models/productModel")

const productList = (req, res)=> {
    ProductModel.find().exec()
    .then((products) => {
        if (products){
            res.json(products, status = 200)
        }
        else{
            res.json({message: "Bad request"}, status = 400)
        }
    })
}

const productDetails = (req, res) => {
    let productID = req.params.id
    ProductModel.findById(productID).exec()
    .then((product) => {
        if (product){
            res.status(200).json(product)
        }
        else{
            res.status(404).json({message: "Product not found"})
        }
    })
    .catch(err => {
        res.status(404).json({message: "Product not found"})
    })
}

const createProduct = (req, res) => {
    const newProduct = new ProductModel(req.body)
    newProduct.save()
    .then((product) => {
        console.log(product)
        res.send("Product created successfully")
    })
}

module.exports = {productList, productDetails, createProduct}