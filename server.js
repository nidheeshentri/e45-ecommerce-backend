const express = require('express')
const mongoose = require('mongoose');
const app = express()
const productRouter = require("./src/routes/productRouter")
const userRouter = require("./src/routes/userRouter")
const cartRouter = require("./src/routes/cartRouter")
const ProductModel = require("./src/models/productModel")
var cors = require('cors')
const dotenv = require('dotenv')
var cookieParser = require('cookie-parser')

dotenv.config({path: './.env'})

const db_link = process.env.DB_LINK;
const port = process.env.PORT;

async function main() {
    await mongoose.connect(db_link);
}

main()
.then(()=>{
    console.log("DB connected")
})
.catch(err => console.log(err));

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(express.json())
app.use(express.static('src/uploads'))
app.use("/", productRouter)
app.use("/user", userRouter)
app.use("/cart", cartRouter)

app.listen(port, ()=>{
    console.log("Server running on port "+port)
})