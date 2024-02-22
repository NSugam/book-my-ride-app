const mongoose = require("mongoose")
const fs = require("fs")

// mongoose.connect("mongodb://localhost:27017/bookymyride");
const RentalDetailsSchema = new mongoose.Schema({
    UserId: String,
    bikeId: String,
    pickupDate: String,
    pickupTime: String

})
const RentalDetailsModel = mongoose.model("vehicle-details", RentalDetailsSchema)

module.exports=RentalDetailsModel

// RentalDetailsModel.create({
//     bikeName:"BMW",
//     modelName:"S1000RR",
//     color: "Default",
//     vType: "M300",
//     city: "Bangalore",
//     rate: 35,
//     limit: 150
//     cc: "998"
//     img: "https://th.bing.com/th/id/R.2dbfddd7833ebea7818a9e7e49b8eec6?rik=phpXfs99TQ2FMQ&riu=http%3a%2f%2fwww.asphaltandrubber.com%2fwp-content%2fuploads%2f2012%2f10%2f2013-BMW-S1000RR-HP4-119.jpg&ehk=VexuoB%2fXjhiGAYebAxLpYIGEJTom9nqlHH6XqA5CnaQ%3d&risl=&pid=ImgRaw&r=0"
// })
