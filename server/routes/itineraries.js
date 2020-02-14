
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
router.get('/Amsterdam', (req, res) => {
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

router.get('/Valencia', (req, res) => {
    console.log(res +"RESSSSSSSSSSSSSSSS")
    // let cityRequested = req.params.parentCity_id;
    // console.log(cityRequested)
    itineraryModel.find({ parentCity_id : "5e3940c01c9d4400002af04a" })
    // console.log(parentCity_id)
        .then(files => {
            console.log(files)
            return res.send(files)
        })
        .catch(err => console.log(err));
});

router.get('/Malaga', (req, res) => {
    console.log(res +"RESSSSSSSSSSSSSSSS")
    // let cityRequested = req.params.parentCity_id;
    // console.log(cityRequested)
    itineraryModel.find({ parentCity_id : "5e3940891c9d4400002af049" })
    // console.log(parentCity_id)
        .then(files => {
            console.log(files)
            return res.send(files)
        })
        .catch(err => console.log(err));
});

router.get('/Barcelone', (req, res) => {
    console.log(res +"RESSSSSSSSSSSSSSSS")
    // let cityRequested = req.params.parentCity_id;
    // console.log(cityRequested)
    itineraryModel.find({ parentCity_id : "5e3827931c9d4400006098dd" })
    // console.log(parentCity_id)
        .then(files => {
            console.log(files)
            return res.send(files)
        })
        .catch(err => console.log(err));
});

router.get('/Paris', (req, res) => {
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

//Amsterdam 
// 5e4521041c9d4400003cc9eb

// Valencia
// 5e3940c01c9d4400002af04a

// Malaga
// 5e3940891c9d4400002af049

// Barcelone
// 5e3827931c9d4400006098dd

// Paris
// 5e3940de1c9d4400002af04b