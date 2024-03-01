const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = 9090

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/bookymyride");

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
app.use('/api/getRentalDetails', require('./routes/getRentalDetails'))
