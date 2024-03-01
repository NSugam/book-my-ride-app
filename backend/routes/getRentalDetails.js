const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const userDataModel = require('../Modals/Userdata')
const vehicleDetailsModel = require("../Modals/Vehicledata")
const RentalDetailsModel = require("../Modals/Rentaldata")

router.get('/', fetchUser, async (req, res) => {
    try {
        const details = await RentalDetailsModel.find({ userId: req.user.id }).select({ bikeId: 1, _id: 0 });

        // Assuming details is an array of bikeIds
        const bikeIds = details.map(detail => detail.bikeId);

        // Query to find all documents in vehicleDetailsModel where the bikeId is in the bikeIds array
        const vehicleDetails = await vehicleDetailsModel.find({ _id: { $in: bikeIds } });

        res.json(vehicleDetails)

          

    } catch {
        res.send("Server Error")
    }

})

module.exports = router;