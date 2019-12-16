
const setAccessLevel = require("./userUtilities/setAccessLevel");

const UserModel = require("../models/UserModel");

//
// expose these to the outside
//
const userInteraction = {
  find: findUser,
  set: setAccess
};

//
// look for a user in the DB with a matching email
//
function findUser(res, next, email) {
  UserModel.find({email}, (err, users) => {
    if(err){
      console.log("error finding user by email");
      return next(err);
    }

    if(users && users.length > 0){
      res.json({user:users[0]});
    }
    else{
      console.log("no user found");
      res.json({user:null});
    }
  });
}

//
// find the user and set their access level
//
function setAccess(res, next, user, currentProject, foundUser, accessLevel) {
  UserModel.findById(user._id)
  .then(currentUser => {
    if(currentUser.adminProjectAccess.find(access => access._id+"" === currentProject._id+"")){
      UserModel.findById(foundUser._id)
      .then(found => {
        // actually set the access level using the utilitiy
        setAccessLevel(found, found.currentAccessLevel, currentProject._id, accessLevel);
        res.json({message:"user access level saved"});
      })
    }
    else{
      res.json({message: "user does not have admin access"});
    }
  })
  .catch(err => console.log("error setting user access level", {err}));
}

//
// EXPORT
//
module.exports = userInteraction;
