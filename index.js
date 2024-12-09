import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./Database/Config.js";
import authRoute from "./Routes/userRoute.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.get("/",(req,res)=>{
    res.send("Welcome to backend");
})
app.use("/api/auth", authRoute)

const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log("server started on port",port);
    
})