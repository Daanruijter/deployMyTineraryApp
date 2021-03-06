const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

router.post("/", (req, res) => {
  const { email, password, lastName, firstName, picture } = req.body;

  //simple validation//

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user//
  userModel
    .findOne({ email })

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
          //potential problem in heroku//
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
  userModel
    .findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
