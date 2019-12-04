
const express = require("express");

const login = require("./login");
const register = require("./register");
const project = require("./project");
const list = require("./list");
const task = require("./task");

const router = express.Router();

// basic layer: whether we have a user or not
router.get("/checkUser", (req, res, next) => {
  console.log("do we have a user?", req.user);
  return res.json({user:req.user});
});

router.use("/login", login);
router.use("/register", register);
router.use("/project", project);
router.use("/list", list);
router.use("/task", task);

module.exports = router;
