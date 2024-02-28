const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const userDataModel = require('../Modals/Userdata')
const vehicleDetailsModel = require("../Modals/Vehicledata")
const RentalDetailsModel = require("../Modals/Rentaldata")

router.put('/',  fetchUser, async (req,res)=> {
    try{
        const details = await vehicleDetailsModel.find({_id: req.query.bikeId})
        const user = await userDataModel.find({_id: req.user.id}).select("-password")
        res.json({details, user})
    } catch {
        res.status(404).send("Data not found")
    }

})

router.put('/checkout',  fetchUser, async (req,res)=> {
    try{  
        const Vehicledetails = await RentalDetailsModel.find({ $and: [{ userId: req.user.id }, { bikeId: req.query.bikeId }] })

        if (Vehicledetails != "") {
            res.status(409).send("You cannot book the same vehicle twice")
            return
        }
        RentalDetailsModel.create( {
            bikeId: req.query.bikeId,
            userId: req.user.id
        })
        res.send("Booking Confirmed!")

    } catch {
        res.status(404).send("Data not found")
    }

})

module.exports = router;