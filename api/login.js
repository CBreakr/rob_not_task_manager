
const express = require("express");
const passport = require("passport");

const router = express.Router();

//
// log the current user out
//
router.get("/logout", (req, res, next) => {
  req.logout();
  res.json({message:"logout successful"});
});

//
// attempt to log the user in using the localLogin
// strategy found in ../config/auth.js
//
router.post("/",
  passport.authenticate("localLogin"),
  (req, res) => {
    return res.json({user: req.user});
  }
);

module.exports = router;
