const express = require("express")
var fetchUser = require("../middleware/fetchUser")
const router = express.Router()

const vehicleDetailsModel = require("../Modals/Vehicledata")
const userDataModel = require('../Modals/Userdata')

router.post('/', fetchUser, async (req,res)=> {
    const userID = req.user.id;
    const user = await userDataModel.findById(userID).select("-password")

    if(user.email === 'sugam@gmail.com') {
        vehicleDetailsModel.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
    } else {
        res.json('Empty')
    }

})
module.exports = router;