import mongoose from 'mongoose'

export const connection_db = async()=>{
    const conn= await mongoose.connect("mongodb+srv://aaditya:aadi%4098451@bookstore.o9ih2uw.mongodb.net/finance_tracker?retryWrites=true&w=majority&appName=BookStore")
    if(conn){
        console.log("Yepiee MongoDb connected")
    }
    else{
        console.log("Sorry connection failed")
    }
}
