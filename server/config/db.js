const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            connectTimeoutMS: 30000, // 30 seconds
            serverSelectionTimeoutMS: 30000
          });
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB