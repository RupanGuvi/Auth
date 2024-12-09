import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();


const authMiddleware = async (req,res,next) =>{
    const token = req.header('Authorization')
    //const token = req.headers.authorization?.split(' ')[1];
    //const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        //admin logic
        const user = await User.findById(req.user._id);
        if(user.role != 'admin'){
            return res.status(401).json({message: "Access denied"});
        }
        next();
       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Token failed"});
    }
}

