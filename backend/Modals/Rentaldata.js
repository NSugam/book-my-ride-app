const mongoose = require("mongoose")
const fs = require("fs")

const RentalDetailsSchema = new mongoose.Schema({
    userId: String,
    bikeId: Object,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,

})
const RentalDetailsModel = mongoose.model("rental-details", RentalDetailsSchema)

module.exports=RentalDetailsModel
