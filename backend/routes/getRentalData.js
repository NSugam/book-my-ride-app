const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const vehicleDetailsModel = require("../Modals/Vehicledata")
const RentalDataModel = require("../Modals/Rentaldata")

router.get('/', fetchUser, async (req, res) => {

    const userId = req.user.id;

    RentalDataModel.aggregate([
        {
            $match: { userId: userId }
        },
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
                date: 1,
                payment: 1,
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
            res.send(result)
        })
        .catch(err => {
            res.status(500).send("Internal Server Error")
            console.error(err);
        });

})

module.exports = router;