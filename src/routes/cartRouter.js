const express = require("express")
const { getCartItems, AddToCart } = require("../controllers/cartController")
const authenticateUser = require("../middlewares/authenticationMiddleware")
const router = express.Router()

router.get("/", getCartItems)
router.post("/", authenticateUser, AddToCart)

module.exports = router