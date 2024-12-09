import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();


//register User 

export const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashPassword})
        await newUser.save();
    res.status(200).json({message: "Registration successful",result: newUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Registration failed"});
        
    }
}

//login User 

export const loginUser = async (req,res)=>{
    try {
      const {email,password} = req.body;
      const userDetail = await User.findOne({email});
  if(!userDetail){ 
        return res.status(404).json({message: "User not found"})
       }

  const passwordMatch = await bcrypt.compare(password,userDetail.password);
       if(!passwordMatch){
        return res.status(401).json({message: "Invalid credentials"});
       }

       //jwt part
       const token = jwt.sign({_id:userDetail._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
   userDetail.token = token;
await userDetail.save();


res.status(200).json({message: "Login successful", token:token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Login failed"});
        
    }
}



