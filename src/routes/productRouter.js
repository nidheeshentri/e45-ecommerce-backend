const express = require("express")
const router = express.Router()
const {productList, productDetails, createProduct} = require("../controllers/productController")
const {authenticateAdmin} = require("../middlewares/authenticationMiddleware")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/product_images/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+file.originalname)
    },
  })

const upload = multer({storage: storage})

router.get("/", productList)
router.post("/", authenticateAdmin, upload.single('file'),createProduct)
router.get("/products/:id", productDetails)

module.exports = router