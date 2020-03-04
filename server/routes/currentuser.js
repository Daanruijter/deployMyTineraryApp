const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

// "5e54f3bcdc1ac8371c7eb5b9"

//get the current user with the token
router.post("/", (req, res) => {
  console.log(req.body);
  console.log("line16");

  // let test = req;
  // console.log(test);

  // res.send(test);

  //the id needs to come from req//

  // test = req.body.test;
  // res.send(test);
  // userModel
  //   .findById(test)

  //   .then(user => {
  //     //sends the user back to the api so that it can be fetched//
  //     return res.send(user);
  //   })
  //   .catch(err => console.log(err));
});

//   const { token } = req.body;
//   console.log(token);
//   userModel.findById({ token }).then(token => {
//     console.log(token);
//   });

//path for getting userID//
// app.use("/currentuser", require("./routes/auth"));

module.exports = router;
