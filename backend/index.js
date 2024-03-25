require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// Middlewares
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 9090
mongoose.connect(process.env.MONGODB_SERVER);

app.get('/', ()=> {
    console.log("BookMyRide Server Status: Running...")
})

app.listen(PORT, ()=> {
    console.log("Server is Running on: http://localhost:9090")
})


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
