const express = require('express')
const mongoose = require('mongoose');
const app = express()
const productRouter = require("./src/routes/productRouter")
const userRouter = require("./src/routes/userRouter")
const cartRouter = require("./src/routes/cartRouter")
const ProductModel = require("./src/models/productModel")
var cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const db_link = process.env.DB_LINK;

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
    await mongoose.connect(db_link);
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
app.use("/cart", cartRouter)

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})