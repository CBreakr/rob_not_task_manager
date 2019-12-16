
const express = require("express");

const router = express.Router();

const UserModel = require("../models/UserModel");

const userInteraction = require("../database/userInteraction");

//
// search the DB for a user with matching email address
//
router.post("/finduserbyemail", (req, res, next) => {
  const email = req.body.userEmail;
   userInteraction.find(res, next, email);
});

//
// set the access level for the specified user
// as it applies to the given project
//
router.post("/setuseraccess", (req, res, next) => {
  const {user} = req;
  const {currentProject, foundUser, accessLevel} = req.body;
  userInteraction.set(res, next, user, currentProject, foundUser, accessLevel);
});

module.exports = router;
