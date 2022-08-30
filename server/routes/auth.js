//package imports
const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const authRouter = express.Router();

//post data in database
authRouter.post("/api/signup", async (req, res) => {

    try{
        //request body map
        const {name, email, password} = req.body;

        //
        console.log(email);
        const existingUser = await User.findOne({email});

        if(existingUser) {
            //return message with 400 bad request status code
            return res.status(400).json({message: "User already exists"});
        }

        //encrypt password with bcryptjs
        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({email, password: hashedPassword, name,});

        //post to database
        user = await user.save();

        res.json(user);
        //return data to user
    }catch(e) {
        res.status(500).json({error: e.message});
    }
});

//to use authRouter elsewhere in the application
module.exports = authRouter;