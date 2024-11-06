const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt');

const saltRounds = 5;

const CreateUserController = (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        console.log(hash)
        if (hash){
            const user = new UserModel(req.body)
            user.password = hash
            user.save()
            .then((user) =>{
                console.log(user)
                res.status(201).json({message: "Registered successfully"})
            })
            .catch(err => {
                res.status(400).json({message: "Bad request. Try again1"})
            })
        }else{
            res.status(400).json({message: "Bad request. Try again2"})
        }
    });
}

const LoginController = (req, res) => {
    console.group(req.body)
    res.status(200).json({message: "Loggedin successfully"})
}

module.exports = {CreateUserController, LoginController}