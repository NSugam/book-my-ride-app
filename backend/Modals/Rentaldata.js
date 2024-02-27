const mongoose = require("mongoose")
const fs = require("fs")

const RentalDetailsSchema = new mongoose.Schema({
    UserId: String,
    bikeId: String,
    pickupDate: String,
    pickupTime: String

})
const RentalDetailsModel = mongoose.model("rental-details", RentalDetailsSchema)

module.exports=RentalDetailsModel
