const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const cityModel = require("../model/cityModel");
const itineraryModel = require("../model/itineraryModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/getCityName/:cityName", (req, res) => {
  let cityName = req.params.cityName;
  cityModel.findOne({ name: cityName }).then(result => {
    console.log(result, "result");
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
      // console.log(result);
      // console.log("result, line 34");
      let ids = result.favourites.map(function(arr) {
        // console.log(arr);
        // console.log("arr");
        return arr;
      });
      itineraryModel.find({ _id: { $in: ids } }).then(result => {
        res.send(result);
        // console.log(result);
        // console.log("result, line 34");
      });
    })
    .catch(error => {
      console.log(error);
      res.send(err);
    });

  //   // let test = "" + req + "";
  //   // let test = req;
  //   // console.log(test);

  // function arrayToString(arr) {
  //   //   let str = "";
  //   //   arr.forEach(function(i, index) {
  //   //     str += i;
  //   //     if (index != arr.length - 1) {
  //   //       str += ",";
  //   //     }
  //   //   });
  //   //   return str;
  //   // }
  //   // let favouritesArrayString = arrayToString(favouritesArray);
  //   // JSON.stringify(favouritesArray);
  //   // console.log(favouritesArrayString);
  //   res.send(req.headers);
  //   // console.log(req);
  //   // favouritesArray = [
  //   //   "5e45275d1c9d4400003cc9f4",
  //   //   "5e4529291c9d4400003cc9f7",
  //   //   "5e4527f51c9d4400003cc9f5",
  //   //   "5e45241f1c9d4400003cc9ef",
  //   //   "5e45234e1c9d4400003cc9ee",
  //   //   "5e4522061c9d4400003cc9ec",
  //   //   "5e4521041c9d4400003cc9eb",
  //   //   "5e4529dd1c9d4400003cc9f8",
  //   //   "5e452bde1c9d4400003cc9fb",
  //   //   "5e452b5c1c9d4400003cc9fa",
  //   //   "5e452a9f1c9d4400003cc9f9"
  //   // ];
  //   // console.log(test);
  //   // let idOfCurrentUser = req.params.idOfCurrentUser;
  //   // console.log(req);
  //   // console.log("req");
  //   // let ids = favouritesArray.map(function(arr) {
  //   //   // console.log(JSON.stringify(arr));
  //   //   // console.log("arr");
  //   //   return arr;
  //   // });
  //   itineraryModel
  //     .find({ _id: { $in: ids } })
  //     .then(result => {
  //       console.log(result);
  //       console.log("result, line 34");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.send(err);
  //     });
});
//get favourite itineraries//

// router.get("/getfavourites/:idOfCurrentUser", (req, res) => {
//   let idOfCurrentUser = req.params.idOfCurrentUser;
//   console.log(idOfCurrentUser);

//   userModel
//     .findById({ _id: idOfCurrentUser })
//     .then(files => {
//       console.log(files);
//       return res.send(files);
//     })
//     .catch(err => console.log(err));

//   // userModel.deleteOne( works: removes the whole user/document)
// });

// Get favourites
router.get("/getfavourites/:idOfCurrentUser", (req, res) => {
  let idOfCurrentUser = req.params.idOfCurrentUser;
  // console.log(idOfCurrentUser);

  userModel
    .findById({ _id: idOfCurrentUser })
    .then(files => {
      // console.log(files);
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
  // userModel.deleteOne( works: removes the whole user/document)

  userModel.findOneAndUpdate(
    { _id: idOfCurrentUser },
    { $pull: { favourites: idOfItinerary } },
    (err, doc) => {
      // console.log(doc);
      res.send({ doc, err });
      // res.send({ err });

      // console.log(doc);s
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
    { $addToSet: { favourites: itineraryId } },
    (err, doc) => {
      // console.log(doc);
      res.send({ doc, err });
      // res.send({ err });
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
