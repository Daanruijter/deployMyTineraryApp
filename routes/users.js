const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const cityModel = require("../model/cityModel");
const itineraryModel = require("../model/itineraryModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/getCityName/:cityName", (req, res) => {
  console.log("cityName");
  let cityName = req.params.cityName;
  console.log(cityName);
  cityModel.findOne({ name: cityName }).then(result => {
    res.send(result);
  });
});

router.get("/getFavouritesPage/:idOfCurrentUser", (req, res) => {
  let idOfCurrentUser = req.params.idOfCurrentUser;
  userModel
    .findById({ _id: idOfCurrentUser })
    .then(result => {
      return result;
    })
    .then(result => {
      let ids = result.favourites.map(function(arr) {
        return arr;
      });
      itineraryModel.find({ _id: { $in: ids } }).then(result => {
        res.send(result);
      });
    })
    .catch(error => {
      console.log(error);
      res.send(err);
    });
});

// Get favourites
router.get("/getfavourites/:idOfCurrentUser", (req, res) => {
  let idOfCurrentUser = req.params.idOfCurrentUser;

  userModel
    .findById({ _id: idOfCurrentUser })
    .then(files => {
      return res.send(files);
    })
    .catch(err => {
      res.send(err);
    });

  // userModel.deleteOne( works: removes the whole user/document)
});

router.delete("/delete/:idOfCurrentUser/:idOfItinerary", (req, res) => {
  let idOfCurrentUser = req.params.idOfCurrentUser;
  let idOfItinerary = req.params.idOfItinerary;

  userModel.findOneAndUpdate(
    { _id: idOfCurrentUser },
    { $pull: { favourites: idOfItinerary } },
    (err, doc) => {
      res.send({ doc, err });
    }
  );
});

router.post("/:idOfCurrentUser", (req, res) => {
  let currentUserId = req.params.idOfCurrentUser;

  let itineraryId = req.body.itineraryId;

  userModel.findOneAndUpdate(
    { _id: currentUserId },
    { $addToSet: { favourites: itineraryId } },
    (err, doc) => {
      res.send({ doc, err });
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
