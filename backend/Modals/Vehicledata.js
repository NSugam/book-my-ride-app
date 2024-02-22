const mongoose = require("mongoose")
const fs = require("fs")

// mongoose.connect("mongodb://localhost:27017/bookymyride");
const vehicleDetailsSchema = new mongoose.Schema({
    bikeName: String,
    modelName: String,
    color: String,
    vType: String,
    city: String,
    img: String,
    rate: Number,
    limit: Number,
    cc: String
})
const vehicleDetailsModel = mongoose.model("vehicle-details", vehicleDetailsSchema)

module.exports=vehicleDetailsModel

// vehicleDetailsModel.create({
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
