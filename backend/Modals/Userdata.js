const mongoose = require("mongoose")

const userDataSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    phone: Number,
    email: String,
    password: String,
})
const userDataModel = mongoose.model("userdata", userDataSchema)

module.exports=userDataModel


