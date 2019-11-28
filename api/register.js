
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

router.post("/aaa", (req, res, next) => {

  console.log("POST register", req.body);

  passport.authenticate("localRegister", (err, user) => {

    console.log("register authenticate", {err, user});

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
})

module.exports = router;
