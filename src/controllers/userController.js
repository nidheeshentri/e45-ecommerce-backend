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
                    var token = jwt.sign({email: email}, secretKey);
                    res.status(200).json({token: token})
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
    var token = jwt.sign({ email: email }, secretKey);
    
}

module.exports = {CreateUserController, LoginController}