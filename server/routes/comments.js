const express = require("express");
const router = express.Router();
const commentModel = require("../model/commentModel");

const bcrypt = require("bcryptjs");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authMiddleware");

//get the current user with the token

router.post("/", (req, res) => {
  //   console.log(req);
});

module.exports = router;
