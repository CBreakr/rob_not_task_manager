
const express = require("express");

const login = require("./login");
const register = require("./register");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({message:"GET"});
});

router.post("/", (req, res, next) => {
  const body = req.body;

  res.json({message:"POST", body});
});

router.use("/login", login);
router.use("/register", register);

module.exports = router;
