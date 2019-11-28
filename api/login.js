
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET login");
  return res.json({message:"we can see this"});
});

router.post("/",
  passport.authenticate("localLogin"),
  (req, res) => {
    console.log("login successful", req.user);
    return res.json({user: req.user});
  }
);

router.post("/aaa", (req, res, next) => {
  passport.authenticate("localLogin", (err, user) => {
    if(err){
      return res.json({err});
    }
    else if(!user){
      return res.json({err: new Error("no user returned")});
    }

    req.login(user, (err) => {
      if(err){
        return res.json({err: "could not log in"});
      }
      return res.json({user});
    });
  });
});

module.exports = router;
