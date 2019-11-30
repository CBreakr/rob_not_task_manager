
const express = require("express");

const login = require("./login");
const register = require("./register");

const router = express.Router();

router.get("/checkUser", (req, res, next) => {
  console.log("do we have a user?", req.user);
  return res.json({user:req.user});
});

router.use("/login", login);
router.use("/register", register);

module.exports = router;
