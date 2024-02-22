const express = require("express")
const router = express.Router()

const vehicleDetailsModel = require("../Modals/Vehicledata")
router.post('/',  (req,res)=> {
    vehicleDetailsModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
module.exports = router;