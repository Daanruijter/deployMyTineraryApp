const express = require("express");
const router = express.Router();
const commentModel = require("../model/commentModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

//get the current user with the token

router.post("/saveComment", (req, res) => {
  const comment = new commentModel(req.body);
  comment.save((err, comment) => {
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(comment._id);
    // commentModel
    //   .find({ id: comment._id })
    //   .populate("writer")
    //   .exec((err, result) => {
    //     if (err) {
    //       return res.json({ success: false, err });
    //     }
    //     return res.status(200).json({ succes: true, result });
    //   });
  });
});

module.exports = router;
