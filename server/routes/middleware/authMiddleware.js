const config = require('config')
const jwt = require('jsonwebtoken')
console.log("akdhakdhjadkhd")

//next brings you to the next middleware once you are done with what the middleware does//

//function sends along a token//
function auth (req,res,next){

    const token = req.header('x-auth-token')
    
console.log("akdhakdhjadkhd")
    console.log(token)
    //check for token//
    if(!token){
        //401=you don't have the right permission: user is unauthorized//
        res.status(401).json({msg:'No token, authorization denied'})
       
    }

    try {
 //verify token//
 const decoded = jwt.verify (token, config.get('jwtSecret'))
 //add user from payload//
 req.user=decoded
 next()
    }
    catch(e){
        res.status(400).json({msg:'Token is not valid'})
    }
  
}

module.exports = auth