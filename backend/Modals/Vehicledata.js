const mongoose = require("mongoose")
const fs = require("fs")

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
