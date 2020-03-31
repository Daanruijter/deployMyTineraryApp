const config =
  "mongodb+srv://dr:sSXGDQnstqEWcLHx@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken");

//next brings you to the next middleware once you are done with what the middleware does//

//function sends along a token//
function auth(req, res, next) {
  const token = req.headers["x-auth-token"];

  console.log("middelware logs token from line 12 (see below)");
  // console.log(token);
  //check for token//
  if (token == undefined) {
    //401=you don't have the right permission: user is unauthorized//
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    //verify token//
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //add user from payload//
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
