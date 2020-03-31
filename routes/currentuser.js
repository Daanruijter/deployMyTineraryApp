const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

const auth = require("./middleware/authMiddleware");

//get the current user with the token

router.post("/", auth, (req, res) => {
  const user = req.user;

  userModel
    .findById(user.id)

    .then(user => {
      return res.send(user);
    });
});

module.exports = router;
