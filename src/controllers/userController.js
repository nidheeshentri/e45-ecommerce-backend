const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 5;
const secretKey = "@12345Ab"

const CreateUserController = (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        console.log(hash)
        if (hash){
            console.log(hash)
            const user = new UserModel(req.body)
            user.password = hash
            user.save()
            .then((user) =>{
                console.log(user)
                res.status(201).json({message: "Registered successfully"})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: "Bad request. Try again1"})
            })
        }else{
            res.status(400).json({message: "Bad request. Try again2"})
        }
    });
}

const LoginController = (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    console.log(password)
    UserModel.findOne({email: email}).exec()
    .then(user => {
        if (user){
            bcrypt.compare(password, user.password, function(err, result) {
                if (result){
                    var access_token = jwt.sign({email: email}, secretKey, {expiresIn: '15m'});
                    var refresh_token = jwt.sign({email: email}, secretKey, {expiresIn: "30d"});
                    res.status(200).json({token: access_token, refresh: refresh_token})
                }else{
                    res.status(400).json({message: "Invalid credentials"})
                }
            });
        }else{
            res.status(404).json({message: "Invalid Email ID"})
        }
        console.log(user)
    }).catch(err => {
        res.status(400).json({message: "Invalid credentials"})
    })
    
}

const GetTokenFromRefreshToken = (req, res) => {
    const email = req.user.email
    var access_token = jwt.sign({email: email}, secretKey, {expiresIn: '15m'});
    res.json({"token": access_token})
}

const CheckAdmin = (req, res) => {
    console.log("Admin")
    res.send("Success")
}

module.exports = {CreateUserController, LoginController, CheckAdmin, GetTokenFromRefreshToken}