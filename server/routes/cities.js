


const express = require('express')

const router = express.Router()

const cityModel = require('../model/cityModel')


router.get('/testing',function(req,res){
res.send({type:'get'})

})



/*get all cities*/
router.get('/all',
    (req, res) => {
        console.log(res +"RESSSSSSSSSSSSSSSS")
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


    router.get('/one',
    (req, res) => {
        console.log(res +"RESSSSSSSSSSSSSSSS")
        cityModel.findById('5e3827091c9d4400006098dc')
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


router.get('/test', (req, res) => {
    


res.send("Ajasx is art")

})

router.get('/test', (req, res) => {
    


    res.send("Ajax is a2rt")
    
    })
module.exports = router



