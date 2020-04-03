const express = require("express");
const router = express.Router();
const commentModel = require("../model/commentModel");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

//get the current user with the token

router.post("/saveComment", (req, res) => {
  console.log(req.body.postId);
  const comment = new commentModel(req.body);
  comment
    .save()
    .then(() => {
      commentModel.find({ postId: req.body.postId }).then(result => {
        return res.status(200).json({ success: true, result });
      });
    })

    .catch(err => {
      return res.json({ succes: false, err });
    });
});

router.post("/getCommentsForASpecificItinerary", (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  commentModel
    .find({ postId: req.body.itineraryId })
    .then(result => {
      return res.status(200).json({ success: true, result });
    })
    .catch(err => {
      return res.json({ succes: false, err });
    });
});

module.exports = router;
