
const express = require("express");

const router = express.Router();

const UserModel = require("../models/UserModel");

const userInteraction = require("../database/userInteraction");

//
//
//
router.post("/finduserbyemail", (req, res, next) => {
  const email = req.body.userEmail;
   userInteraction.find(res, next, email);
});

//
//
//
router.post("/setuseraccess", (req, res, next) => {
  const {user} = req;
  const {currentProject, foundUser, accessLevel} = req.body;
  userInteraction.set(res, next, user, currentProject, foundUser, accessLevel);
});

module.exports = router;
