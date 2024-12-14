import mongoose from 'mongoose'

export const connection_db = async()=>{
    const conn= await mongoose.connect('mongodb://127.0.0.1:27017/financetracker')
    if(conn){
        console.log("Yepiee MongoDb connected")
    }
    else{
        console.log("Sorry connection failed")
    }
}
