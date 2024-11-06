const express = require('express')
const mongoose = require('mongoose');
const app = express()
const productRouter = require("./src/routes/productRouter")
const userRouter = require("./src/routes/userRouter")
const ProductModel = require("./src/models/productModel")
var cors = require('cors')

var allowlist = ['http://localhost:5173', 'http://127.0.0.1:5173']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

async function main() {
    await mongoose.connect('mongodb+srv://nidheeshb:cbNIJhHxg7xib6Jx@ecommerce.fbs8r.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce');
}

main()
.then(()=>{
    console.log("DB connected")
})
.catch(err => console.log(err));

app.use(cors(corsOptionsDelegate))

app.use(express.json())
app.use("/", productRouter)
app.use("/user", userRouter)

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})