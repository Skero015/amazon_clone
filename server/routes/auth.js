//package imports
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//model imports
const User = require("../models/user");

//middleware import
const authRouter = express.Router();

//sign up user -- post data in database
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

//sign in user -- post data in database
authRouter.post("/api/signin", async (req, res) => {

    try{
        //request body map
        const {email, password} = req.body;

        //
        console.log(email);
        const existingUser = await User.findOne({email});

        if(!user) {
            //return message with 400 bad request status code
            return res.status(400).json({message: "User with this email does not exist."});
        }

        //encrypt password with bcryptjs
        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Incorrect password."});
        }

        const token = jwt.sign({id: user._id}, "passwordKey")

        res.json({token, ...user._doc});
        //return data to user
    }catch(e) {
        res.status(500).json({error: e.message});
    }
});

//to use authRouter elsewhere in the application
module.exports = authRouter;