import { asyncHandler } from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }catch(error){
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};  