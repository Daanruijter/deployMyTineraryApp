
const express = require('express')


const router = express.Router()

router.get('/test', (req, res) => {
    


res.send("Ajasx is art")

})

router.get('/test', (req, res) => {
    


    res.send("Ajax is a2rt")
    
    })
module.exports = router

console.log(router)

