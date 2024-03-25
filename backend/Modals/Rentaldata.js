const mongoose = require("mongoose")

const RentalDetailsSchema = new mongoose.Schema({
    userId: String,
    bikeId: mongoose.Schema.Types.ObjectId,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    payment: String,
    date: { type: Date, default: Date.now }

})
const RentalDataModel = mongoose.model("rental-details", RentalDetailsSchema)

module.exports=RentalDataModel
