
const express = require("express");
const passport = require("passport");

const router = express.Router();

//
// register a new user, with the localRegister
// strategy as found in ../config/auth.js
//
router.post("/",
  passport.authenticate("localRegister"),
  (req, res) => {
    console.log("successful authentication", req.user);
    return res.json({user: req.user});
  }
);

module.exports = router;
