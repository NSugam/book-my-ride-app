const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const userDataModel = require('../Modals/Userdata')
const vehicleDetailsModel = require("../Modals/Vehicledata")

router.post('/',  fetchUser, async (req,res)=> {
    const Vehicle = await vehicleDetailsModel.findById(req.body.bikeId)
    const user = await userDataModel.findById(req.user.id).select("-password")
    res.send({Vehicle, user})

})

module.exports = router;