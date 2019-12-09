
const express = require("express");

const router = express.Router();

const UserModel = require("../models/UserModel");

const accessLevelList = [
  "read",
  "create/edit",
  "admin"
];

router.post("/finduserbyemail", (req, res, next) => {
  console.log("find user by email", {body: req.body});

  UserModel.find({email:req.body.userEmail}, (err, users) => {
    if(err){
      console.log("error finding user by email");
      return next(err);
    }

    if(users && users.length > 0){
      console.log("found a user", {users});
      res.json({user:users[0]});
    }
    else{
      console.log("no user found");
      res.json({user:null});
    }
  });
});

router.post("/setuseraccess", (req, res, next) => {
  console.log("set user access", {body: req.body});

  const {user} = req;
  const {currentProject, foundUser, accessLevel} = req.body;

  UserModel.findById(user._id)
  .then(currentUser => {
    console.log("we have the current user");
    if(currentUser.adminProjectAccess.find(access => access._id+"" === currentProject._id+"")){
      UserModel.findById(foundUser._id)
      .then(found => {
        console.log("we have the found user");
        setAccessLevel(found, currentProject._id, accessLevel);
        res.json({message:"user access level saved"});
      })
    }
    else{
      console.log("current user doesn't have admin access");
      res.json({message: "user does not have admin access"});
    }
  })
  .catch(err => console.log("error setting user access level", {err}));

  // need to make sure that the current user
  // has admin access to the current project
  // then need to set the access level for the user specified

  // res.json({message:"nothing here yet"});
});

function setAccessLevel(user, projectId, level){
  switch(level){
    case "read":
      user.readProjectAccess.push(projectId);
      break;
    case "create/edit":
      user.useProjectAccess.push(projectId);
      break;
    case "admin":
      user.adminProjectAccess.push(projectId);
      break;
    default:
      console.log("wrong access level sent");
  }

  user.save();
}

module.exports = router;
