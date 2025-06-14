const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const User = require('../schema/userSchema');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
};

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    const UserExits = await User.findOne({email});
    if(UserExits){
        res.status(400);
        throw new Error("Email is already exits");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if(user){
        const {_id,name,email} = user;
        res.status(201).json({_id,name,email});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    // console.log("loginuser ",req.body);

    if(!email || !password){
        res.status(400);
        throw new Error("Please add Email and Password");
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    const passwordIsCorrect = await bcrypt.compare(password,user.password);

    const token = generateToken(user._id);
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if(user && passwordIsCorrect){
        const {_id,name,email}=user;
        res.status(201).json({_id,name,email});
    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

const loginStatus = asyncHandler(async(req,res)=>{
    const token = req.cookies.token;
    // console.log("token",token);
    if(!token){
        return res.json(false);
    }
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    if(verified){
        return res.json(true);
    }
    return res.json(false);
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
  });

const adminlogin = asyncHandler(async(req,res)=>{
    // console.log("admin login");
    const {email,password,code} = req.body;
    console.log(req.body);
    const user = await User.findOne({email});

    if(!email || !password || !code){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    if(code !== process.env.JWT_ADMIN){
        res.status(400);
        throw new Error("Only for admin");
    }

    const passwordIsCorrect = await bcrypt.compare(password,user.password);

    const token = generateToken(user._id);
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });
    if(user && passwordIsCorrect){
        const {_id,name,email}=user;
        res.status(201).json({_id,name,email});
    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

// const testing = asyncHandler(async (req,res)=>{
//     res.send("lol lol tesing");
// });

module.exports = {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
    adminlogin,
    // testing
};
