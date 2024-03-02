const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const vehicleDetailsModel = require("../Modals/Vehicledata")

router.post('/', fetchUser, async (req, res) => {
    const { city, vtype, sortBy } = req.body

    let sortObj = {};
    sortObj[sortBy] = 1;

    if (req.body.vtype === "Any") {
        const allVehicle = await vehicleDetailsModel.find({ city: city }).sort(sortObj)
        if (allVehicle == "") {
            res.json("Empty")
            return
        }
        res.json(allVehicle)
        return
    }
    else {
        const details = await vehicleDetailsModel.find({ city: city, vType: vtype }).sort(sortObj)
        if (details == "") {
            res.json("Empty")
            return
        }
        res.json(details)
    }

})

module.exports = router