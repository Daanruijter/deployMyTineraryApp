
const express = require('express')
const router = express.Router()
const itineraryModel = require('../model/itineraryModel')

/*get all itineraries*/
router.get('/routetjes', (req, res) => {
    console.log(res +"RESSSSSSSSSSSSSSSS")
    itineraryModel.find({})
        .then(files => {
            console.log(files)
            return res.send(files)
        })
        .catch(err => console.log(err));
});


/*get all itineraries*/
router.get('/rou', (req, res) => {
    console.log(res +"RESSSSSSSSSSSSSSSS")
    // let cityRequested = req.params.parentCity_id;
    // console.log(cityRequested)
    itineraryModel.find({ parentCity_id : "5e3940de1c9d4400002af04b" })
    // console.log(parentCity_id)
        .then(files => {
            console.log(files)
            return res.send(files)
        })
        .catch(err => console.log(err));
});



module.exports = router