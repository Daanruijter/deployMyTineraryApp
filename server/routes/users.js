const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
let favouritesArray = [];

// Get favourites
router.get("/getfavourites/:idOfCurrentUser", (req, res) => {
  let idOfCurrentUser = req.params.idOfCurrentUser;
  console.log(idOfCurrentUser);

  userModel
    .findById({ _id: idOfCurrentUser })
    .then(files => {
      console.log(files);
      return res.send(files);
    })
    .catch(err => console.log(err));

  // userModel.deleteOne( works: removes the whole user/document)
});

router.delete("/delete/:idOfCurrentUser/:idOfItinerary", (req, res) => {
  let idOfCurrentUser = req.params.idOfCurrentUser;
  let idOfItinerary = req.params.idOfItinerary;
  // userModel.deleteOne( works: removes the whole user/document)

  userModel.findOneAndUpdate(
    { _id: idOfCurrentUser },
    { $pull: { favourites: idOfItinerary } },
    (err, doc) => {
      // console.log(doc);
      res.send({ doc });
      // console.log(doc);
      // console.log("from line 21");
      // console.log(err);
    }
  );
});

router.post("/:idOfCurrentUser", (req, res) => {
  // console.log(req.params);
  let currentUserId = req.params.idOfCurrentUser;
  // console.log(currentUserId);
  let itineraryId = req.body.itineraryId;
  // console.log(itineraryId);
  // console.log(currentUserId);

  userModel.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { favourites: itineraryId } },
    (err, doc) => {
      // console.log(doc);
      res.send({ doc });
      // console.log("from line 39");
    }
  );
});

router.post("/", (req, res) => {
  const { firstName, lastName, password, email, picture } = req.body;

  //simple validation//

  if (!firstName || !lastName || !picture || !password || !email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing user//
  userModel.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }

    //you need the userModel to make a database entryable new instance of an user//
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      picture: picture
    });

    //Create salt and hash//
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        //saves the user in the database//
        newUser
          .save()

          .then(user => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    id: user.id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    picture: picture
                  }
                });
              }
            );
          });
      });
    });
  });
});

module.exports = router;

//gives back a new user//
