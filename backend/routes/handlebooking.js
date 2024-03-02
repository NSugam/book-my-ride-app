const express = require("express")
const mongoose = require("mongoose")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()
const bodyParser = require('body-parser');

const userDataModel = require('../Modals/Userdata')
const vehicleDetailsModel = require("../Modals/Vehicledata")
const RentalDataModel = require("../Modals/Rentaldata")

router.put('/',  fetchUser, async (req,res)=> {
    try{
        const details = await vehicleDetailsModel.find({_id: req.query.bikeId})
        const user = await userDataModel.find({_id: req.user.id}).select("-password")
        res.json({details, user})
    } catch {
        res.status(404).send("Data not found")
    }

})

router.put('/checkout', bodyParser.json(), fetchUser, async (req,res)=> {
    try{  
        const { bikeId, startDate, startTime, endDate, endTime, payment } = req.body;

        const Vehicledetails = await RentalDataModel.find({ $and: [{ userId: req.user.id }, { bikeId: bikeId }] })

        if (Vehicledetails != "") {
            res.status(409).send("You cannot book the same vehicle twice")
            return
        }
        RentalDataModel.create( {
            bikeId: bikeId,
            userId: req.user.id,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            payment: payment

        })
        res.send("Booking Confirmed!")

    } catch (error){
        res.status(500).send("Server Problem")
    }

})

module.exports = router;