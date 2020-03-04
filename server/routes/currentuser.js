const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

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

module.exports = router;
