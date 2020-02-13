
const express = require('express')
const router = express.Router()
const cityModel = require('../model/cityModel')



router.get('/testing',function(req,res){
res.send({type:'get'})

})



/*get all cities*/
router.get('/all', (req, res) => {
        // console.log(res +"RESSSSSSSSSSSSSSSS")
        cityModel.find({})
            .then(files => {
                console.log(files)
                return res.send(files)
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


//retrieve a specific city//

    router.get('/:Paris',
	(req, res) => {
  		let cityRequested = req.params.Paris;
  		cityModel.findOne({ name: cityRequested })
			.then(city => {
				res.send(city)
			})
			.catch(err => console.log(err));
});


//on postman this route works with this code above:http://localhost:5000/cities/Valencia//



//retrieve a specific city by queries: user will type the name!//

// router.get('/:name',
// (req, res) => {
//       let cityRequested = req.params.name;
//       cityModel.findOne({ name: cityRequested })
//         .then(city => {
//             res.send(city)
//         })
//         .catch(err => console.log(err));
// });


// get Paris as a city

router.get('/:Paris',
(req, res) => {
    
      let cityRequested = req.params.Paris;
      cityModel.findOne({ name: cityRequested })
        .then(city => {
            res.send(city)
        })
        .catch(err => console.log(err));
});


module.exports = router



