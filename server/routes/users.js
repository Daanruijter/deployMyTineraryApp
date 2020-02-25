
const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')

const bcrypt = require("bcryptjs");

const config = require('config')
const jwt = require('jsonwebtoken')




router.post('/', (req, res) => {
    console.log("sdsdsd", req.body)
    const {firstName, lastName, password, email, picture} = req.body


   //simple validation//


   if (!firstName || !lastName || !picture || !password ||!email){
       return res.status(400).json({msg: 'Please enter all fields'});

   }

   //check for existing user//
   userModel.findOne({email})
   .then(user =>    {
    //    console.log(user + "useer")
       if(user) {
           return res.status(400).json({msg: 'user already exists'});

       }
    //    console.log(firstName)
       
       //you need the userModel to make a database entryable new instance of an user//
       const newUser = new userModel ({
           firstName: firstName,
           lastName: lastName,
           email: email,
           password: password,  
           picture: picture
       })
    //    console.log("newUser" + newUser)

    //    .catch (err => console.log(err))
 
       //Create salt and hash//
       bcrypt.genSalt(10, (err, salt)=> {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) throw err;
               newUser.password = hash;
            //    console.log("nieuwe user" + newUser)
            //    console.log(hash)
               
               //saves the user in the database//
               newUser.save()
            //    console.log("newUser" + newUser)



            //    console.log(user.id)
               .then(user => {
                    // console.log('line 64', user)


                    jwt.sign(
                        {id:user.id},
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                        (err, token)=> {if (err) throw err;

                   res.json({
                       token,
                    user: {
                     // id:user.id,
                     firstName: firstName,
                     lastName: lastName,
                     email: email,
                     password: password,
                     picture: picture 
                        
                    }
               
                })
                        
                        
                        }
                        
                    )

                   
                   
               }
               )

       

           })
       })
   })
        
}); 

module.exports = router

// router.post('/test', (req, res) => {
    
//     // console.log(res +"SDSDSD")

//     userModel.find({})
  
//         .then(files => {

//             return res.send(files)
//         })
//         .catch(err => console.log(err));
// }); 

    //    res.send({firstName, lastName, password, email, picture})