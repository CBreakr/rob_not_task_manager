
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({message: "GET register"});
});

router.post("/",
  passport.authenticate("localRegister"),
  (req, res) => {
    console.log("successful authentication", req.user);
    return res.json({user: req.user});
  }
);

module.exports = router;
