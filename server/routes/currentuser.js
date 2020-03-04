const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

// "5e54f3bcdc1ac8371c7eb5b9"

//get the current user with the token

router.post("/", auth, (req, res) => {
  const user = req.user;
  console.log(user);
  userModel
    .findById(user.id)

    .then(user => {
      console.log(user);
      return res.send(user);
    });
});

// router.get('/:city', (req, res) => {
//   let city = req.params.city

//   itineraryModel.find({ parentCity_id: city })

//       .then(files => {

//           return res.send(files)
//       })
//       .catch(err => console.log(err));
// });

// axios
// .post("http://localhost:5000/currentuser", headers)

// .then(res => {
//   console.log(res);
//   console.log("line 220");
//   dispatch({
//     type: SEND_USER_TOKEN_SUCCESS,
//     payload: res.data
//   });
// })

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

//   const { token } = req.body;
//   console.log(token);
//   userModel.findById({ token }).then(token => {
//     console.log(token);
//   });

//path for getting userID//
// app.use("/currentuser", require("./routes/auth"));

module.exports = router;
