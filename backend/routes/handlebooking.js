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
        const Vehicledetails = await vehicleDetailsModel.find({bikeId: req.query.bikeId},{UserId: req.user.id})
        const userdetails = await userDataModel.find({_id: req.user.id}).select("-password")

        console.log("Vehicledetails: ", Vehicledetails)

        if (Vehicledetails == "") {
            RentalDetailsModel.create( {
                bikeId: req.query.bikeId,
                UserId: req.user.id
            })
            res.send("Booking Confirmed!")
        } else {
            res.send("Data already xa")
        }


    } catch {
        res.status(404).send("Data not found")
    }

})

module.exports = router;