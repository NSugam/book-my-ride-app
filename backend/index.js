require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const PORT = process.env.PORT || 9090
const app = express()

// Middlewares
app.use(express.json())
app.use(cors({
    origin: ['https://bookmyride-frontend.vercel.app', 'http://localhost:3000'],
    credentials: true, // Enable credentials
}));

mongoose.connect(process.env.MONGODB_SERVER);

app.listen(PORT, ()=> {
    console.log("Server is Running")
});

app.get('/', (req,res)=> {
    res.send("BookMyRide Server Status: Running...")
});


//for handling login and Signup
app.use('/api/handleuser', require('./routes/handleuser'))

//for handling search data
app.use('/api/search', require('./routes/search'))

//for handling booking details
app.use('/api/handlebooking', require('./routes/handlebooking'))

// for registering new vehicle
app.use('/api/register', require('./routes/register'))

// for handling user data
app.use('/api/getRentalDetails', require('./routes/getRentalData'))
