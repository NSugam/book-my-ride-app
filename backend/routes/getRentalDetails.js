const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const userDataModel = require('../Modals/Userdata')
const vehicleDetailsModel = require("../Modals/Vehicledata")
const RentalDetailsModel = require("../Modals/Rentaldata")

router.get('/', fetchUser, async (req, res) => {

    RentalDetailsModel.aggregate([
        {
            $lookup: {
                from: vehicleDetailsModel.collection.name,
                localField: "bikeId",
                foreignField: "_id",
                as: "bikeDetails"
            }
        },
        {
            $unwind: "$bikeDetails"
        },
        {
            $project: {
                _id: 0,
                userId: 1,
                bikeId: 1,
                startDate: 1,
                endDate: 1,
                bikeName: "$bikeDetails.bikeName",
                modelName: "$bikeDetails.modelName",
                color: "$bikeDetails.color",
                vType: "$bikeDetails.vType",
                city: "$bikeDetails.city",
                img: "$bikeDetails.img",
                rate: "$bikeDetails.rate",
                limit: "$bikeDetails.limit",
                cc: "$bikeDetails.cc",
            }
        }
    ])
        .exec()
        .then(result => {
            console.log(result);
            res.send(result)
        })
        .catch(err => {
            res.status(500).send("Internal Server Error")
            console.error(err);
        });

})

module.exports = router;