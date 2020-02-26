
const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')


const bcrypt = require("bcryptjs");

const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/authMiddleware')




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
          id:user.id,
       
            
        }
   
    })
            
            
            }
            
        )
    })
  



})
        
}); 

router.get('/user', auth,(req,res) =>{
    userModel.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router

//gives back a token//

// "password": "sss",
// "email": "Veses12s124s2s2s1ss54s@ns.com"