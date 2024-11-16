let jwt = require("jsonwebtoken")
const secretKey = "@12345Ab"
let userModel = require("../models/userModel")

const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization")
    if (token){
        try{
            var decoded = jwt.verify(token, secretKey);
            if (decoded.email){
                req.user = await userModel.findOne({email: decoded.email})
                next()
            }else{
                res.status(401).json({message: "Invalid token"})
            }
        }catch{
            res.status(401).json({message: "Invalid token"})
        }
    }else{
        res.status(401).json({message: "Unauthorized user"})
    }
}

const authenticateAdmin = async (req, res, next) => {
    const token = req.header("Authorization")
    if (token){
        try{
            var decoded = jwt.verify(token, secretKey);
            if (decoded.email){
                let user = await userModel.findOne({email: decoded.email})
                if(user.isAdmin){
                    next()
                }
                else{
                    res.status(401).json({message: "Only admin can access"})
                }
            }else{
                res.status(401).json({message: "Invalid token"})
            }
        }catch{
            res.status(401).json({message: "Invalid token"})
        }
    }else{
        res.status(401).json({message: "Unauthorized user"})
    }
}

module.exports = {authenticateUser, authenticateAdmin}