
const express = require('express')
const router = express.Router()
const itineraryModel = require('../model/itineraryModel')


router.get('/:city', (req, res) => {
    let city = req.params.city
  

    itineraryModel.find({ parentCity_id: city })
  
        .then(files => {
         
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