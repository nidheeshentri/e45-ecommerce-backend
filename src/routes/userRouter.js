const express = require('express')
const router = express.Router()
const {CreateUserController, LoginController, CheckAdmin, GetTokenFromRefreshToken} = require("../controllers/userController")
const {authenticateAdmin, authenticateUser} = require("../middlewares/authenticationMiddleware")

router.post("/register", CreateUserController)
router.post("/login", LoginController)
router.get("/get-access-token", authenticateUser, GetTokenFromRefreshToken)
router.post("/check-admin", authenticateAdmin, CheckAdmin)

module.exports = router


