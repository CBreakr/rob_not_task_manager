
const mongoose = require("mongoose");
const UserModel = require("../../models/UserModel");

/*

After a project is deleted, references to it in the access lists of users should be removed to prevent bloat

*/

module.exports = removeProjectAccess = (project, next) => {
  const userIds = [];
  // create the list to use for the mongo query
  // just to make sue that they're in ObjectId form
  project.userAccess.map(id => {
    userIds.push(mongoose.Types.ObjectId(id));
  });

  UserModel.find({'_id': { $in: userIds}}, (err, users) => {
    if(err){
      // having orphaned records here isn't the worst
      // so don't push here
      // return next(err);
    }
    users.map(user => {
      // remove the id and then save
      removeAllAccess(user, project._id);
      user.save();
    });
  });
}

//
// remove the id from the admin, use, and read access lists
//
function removeAllAccess(user, projectId){
  user.adminProjectAccess = removeFromList(user.adminProjectAccess, projectId);
  user.useProjectAccess = removeFromList(user.useProjectAccess, projectId);
  user.readProjectAccess = removeFromList(user.readProjectAccess, projectId);
}

//
// filter out matches to the id
//
function removeFromList(list, value){
  return list.filter(val => val+"" !== value+"");
}
