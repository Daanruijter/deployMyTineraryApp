
const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')


const bcrypt = require("bcryptjs");

const config = require('config')
const jwt = require('jsonwebtoken')




router.post('/', (req, res) => {
    console.log("req" + req.body.email)

    const {email, password} = req.body


   //simple validation//


   if (!email || !password) {
       return res.status(400).json({msg: 'Please enter all fields'});
   }
   

   //check for existing user//
   userModel.findOne({email})
//    console.log("line 31")
//    console.log("email" +email)
   .then(user =>  {
      
       if(!user) 
           return res.status(400).json({msg: 'user does not exist'});

       
    //    validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

        jwt.sign(
            {id:user.id},
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token)=> {if (err) throw err;

       res.json({
           token,
        user: {
        
     
         email: email,
         password: password,
          id:user.id,
       
            
        }
   
    })
            
            
            }
            
        )
    })
  



})
        
}); 

module.exports = router

