import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connection_db = async()=>{
    const conn= await mongoose.connect(process.env.mongo_uri)
    if(conn){
        console.log("Yepiee MongoDb connected")
    }
    else{
        console.log("Sorry connection failed")
    }
}
