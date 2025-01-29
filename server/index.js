const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db.js')
const router = require('./routes')


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

app.use("/api", router)

const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Database Connected")
        console.log("Server is running ", PORT)
    })
}).catch(err => {
    console.error("Failed to connect to DB", err);
});