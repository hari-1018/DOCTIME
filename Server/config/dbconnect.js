const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.CONNECT_STRING);
        console.log("Database Successfully Connected")
    }
    catch(err){
        console.error("Error Connecting to Database", err)
    }
};

module.exports = connectDB;