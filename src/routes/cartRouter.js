const express = require("express")
const { getCartItems, AddToCart, updateCartItemCount } = require("../controllers/cartController")
const authenticateUser = require("../middlewares/authenticationMiddleware")
const router = express.Router()

router.get("/", authenticateUser, getCartItems)
router.post("/", authenticateUser, AddToCart)
router.post("/update-count", authenticateUser, updateCartItemCount)

module.exports = router