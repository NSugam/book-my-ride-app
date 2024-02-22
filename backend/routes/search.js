const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const vehicleDetailsModel = require("../Modals/Vehicledata")

router.post('/',fetchUser, async (req, res)=> {
    const {city, vtype} = req.body

    if (req.body.vtype === "Any" ) {
        const allVehicle = await vehicleDetailsModel.find({city:city})
        if (allVehicle == "") {
            res.json("Empty")
            return
        }
        res.json(allVehicle)
        return
    }
    else {   
        const details = await vehicleDetailsModel.find({city:city, vType:vtype})
        if (details == "") {
            res.json("Empty")
            return
        } 
        res.json(details)
    }
    
})

module.exports = router