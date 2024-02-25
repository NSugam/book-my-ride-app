const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const userDataModel = require('../Modals/Userdata')
const vehicleDetailsModel = require("../Modals/Vehicledata")

router.put('/',  fetchUser, async (req,res)=> {
    try{
        const details = await vehicleDetailsModel.find({_id: req.query.bikeId})
        const user = await userDataModel.find({_id: req.user.id}).select("-password")
        res.json({details, user})
    } catch {
        res.status(404).send("Data not found")
    }

})

module.exports = router;