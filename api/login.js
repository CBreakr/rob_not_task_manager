
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/logout", (req, res, next) => {
  req.logout();
  res.json({message:"logout successful"});
});

router.post("/",
  passport.authenticate("localLogin"),
  (req, res) => {
    return res.json({user: req.user});
  }
);

module.exports = router;
