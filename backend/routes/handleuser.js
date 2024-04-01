const express = require("express")
const {body} = require('express-validator')
const bcrypt = require("bcryptjs") // for hashing passoword
var jwt = require('jsonwebtoken') //for sending auth token to logged in user


require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET //for sending auth token to logged in user


var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const userDataModel = require('../Modals/Userdata')

// ROUTE 1: Creating New User
router.post('/signup',  async (req,res)=> {
    const {username, phone, email, password} = req.body;
    const checkEmail = await userDataModel.find({email: email})
    const checkUsername = await userDataModel.find({username: username})

    if (checkEmail =="" && checkUsername =="") {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        userDataModel.create( {
            username: username,
            phone: phone,
            email: email,
            password: secPass
        })
        res.send("Account Created Successfully!")
    }
    else {
        res.status(401).send("email or username already exist")
    }

})

//ROUTE 2: Login
router.post('/login', [
    body('password', 'Password cannot be blank').exists()  // checking password valid or not
    ], (req,res)=> {
    const {email, password} = req.body;
    userDataModel.findOne({email: email}).then(details=> {
        if(details) {
            bcrypt.compare(password,details.password).then(pswdCompare=>{
                if(pswdCompare){
                    const data = {
                        user: {
                            id: details.id
                        }
                    }
                    const authtoken = jwt.sign(data, JWT_SECRET)
                    res.send({authtoken: authtoken, username:details.username})
                }
                else {
                    res.status(401).send("Email or Password is Invalid!")
                }
            })
        }
        else {
            res.status(401).send("Email or Password is Invalid!")
        }
    })
})

//ROUTE 3: Change Loggedin User Details
router.post('/edit', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await userDataModel.findById(userID).select("-password");

        if (user) {
            const { username, email, phone } = req.body;
            user.username = username || user.username;
            user.email = email || user.email;
            user.phone = phone || user.phone;

            await user.save();
            res.status(200).json({ message: "Success" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log("Error updating user details:", err);
        res.status(500).json({ message: "Error updating user details" });
    }
});


//ROUTE 4: Get loggedin User Details using auth-token
router.post('/getuser', fetchUser, async (req,res) => {
    try {
        const userID = req.user.id;
        const user = await userDataModel.findById(userID).select("-password")
        res.send(user)
    } catch {
        console.log("Error getting user details")
    }
})

module.exports = router;