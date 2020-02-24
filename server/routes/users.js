
const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')

// router.post('/test', (req, res) => {
    
//     // console.log(res +"SDSDSD")

//     userModel.find({})
  
//         .then(files => {

//             return res.send(files)
//         })
//         .catch(err => console.log(err));
// }); 


router.post('/', (req, res) => {
    console.log(req)
    const {firstName, lastName, password, email, picture} = req.body
   res.send('register')

   //simple validation//

   if (!firstName || !lastName ||!password ||!email ||!picture){
       return res.status(400).json({msg: 'Please enter all fields'});

   }

   //check for existing user//
   userModel.findOne({email})
   .then(user =>    {
       if(user) {
           return res.status(400).json({msg: 'user already exists'});

       }
       const newUser = new User ({
           firstName,
           lastName,
           email,
           password,
           image
       })

       //Create salt and hash//
       bcrypt.genSalt(10, (err, salt)=> {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) throw err;
               newUser.password = hash;
               newUser.save()
               .then(user => {
                   res.json({
                       user: {
                        // id:user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        image: user.image 
                           
                       }
                   })
               })
           })
       })
   })
        
}); 

module.exports = router

