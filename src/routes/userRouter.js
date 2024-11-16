const express = require('express')
const router = express.Router()
const {CreateUserController, LoginController, CheckAdmin} = require("../controllers/userController")
const {authenticateAdmin} = require("../middlewares/authenticationMiddleware")

router.post("/register", CreateUserController)
router.post("/login", LoginController)
router.post("/check-admin", authenticateAdmin, CheckAdmin)

module.exports = router


