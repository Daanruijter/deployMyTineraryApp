const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

// "5e54f3bcdc1ac8371c7eb5b9"

//get the current user with the token
// router.get("/currentuser", (req, res) => {
//   console.log(req);
//   //the id needs to come from req//

//   // test = req.body.test;
//   // res.send(test);
//   // userModel
//   //   .findById(test)

//   //   .then(user => {
//   //     //sends the user back to the api so that it can be fetched//
//   //     return res.send(user);
//   //   })
//   //   .catch(err => console.log(err));
// });

//   const { token } = req.body;
//   console.log(token);
//   userModel.findById({ token }).then(token => {
//     console.log(token);
//   });

//path for getting userID//
// app.use("/currentuser", require("./routes/auth"));

router.post("/", (req, res) => {
  console.log("req" + req.body);

  const { email, password, lastName, firstName, picture } = req.body;

  //simple validation//

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user//
  userModel
    .findOne({ email })
    //    console.log("line 31")
    //    console.log("email" +email)
    .then(user => {
      if (!user) return res.status(400).json({ msg: "user does not exist" });

      //    validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture,
          favourites: user.favourites
        };

        jwt.sign(
          payload,

          config.get("jwtSecret"),
          { expiresIn: 2592000 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: email,
                picture: payload.picture,
                id: payload.id,
                favourites: payload.favourites
              }
            });
          }
        );
      });
    });
});

router.get("/user", auth, (req, res) => {
  // console.log(req);
  console.log("req from line 107 in auth.js");
  userModel
    .findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;

//gives back a token//

// "password": "sss",
// "email": "Veses12s124s2s2s1ss54s@ns.com"
