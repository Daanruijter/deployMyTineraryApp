
const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')
const bcrypt = require("bcrypt");

// router.post('/test', (req, res) => {
    
//     // console.log(res +"SDSDSD")

//     userModel.find({})
  
//         .then(files => {

//             return res.send(files)
//         })
//         .catch(err => console.log(err));
// }); 


router.post('/', (req, res) => {
    console.log("sdsdsd", req.body)
    const {firstName, lastName, password, email, picture} = req.body


   //simple validation//


   if (!firstName || !lastName || !picture || !password ||!email  ){
       return res.status(400).json({msg: 'Please enter all fields'});

   }

   //check for existing user//
   userModel.findOne({email})
   .then(user =>    {
       console.log(user + "useer")
       if(user) {
           return res.status(400).json({msg: 'user already exists'});

       }
       console.log(firstName)
       const newUser = new userModel ({
           firstName: firstName,
           lastName: lastName,
           email: email,
           password: password,  
           picture: picture
       })
       console.log(newUser)
    //    res.send({firstName, lastName, password, email, picture})
    //    .catch (err => console.log(err))
 
       //Create salt and hash//
       bcrypt.genSalt(10, (err, salt)=> {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) throw err;
               newUser.password = hash;
               console.log(hash)
               newUser.save()
               console.log("newUser" + newUser)
               .then(user => {
                   res.json({
                       user: {
                        // id:user.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        picture: picture 
                           
                       }
                       
                   })
                   
                   
               })
           })
       })
   })
        
}); 

module.exports = router

