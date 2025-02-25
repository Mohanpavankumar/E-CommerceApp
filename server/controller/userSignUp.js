const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try {
        const {email, password, name} = req.body

        const user = await userModel.findOne({email})
        console.log("user",user)        

        if(user){
            throw new Error("Already user existed!")
        }

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something Wrong...")
        }

        // To store the hashPassword in database
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const savaUser = await userData.save()

        res.status(201).json({
            data : savaUser,
            success : true,
            error : false,
            message : "User Created Successfully!"
        })
        
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController