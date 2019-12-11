
const mongoose = require("mongoose");
const UserModel = require("../../models/UserModel");

module.exports = removeProjectAccess = (project, next) => {
  const userIds = [];
  project.userAccess.map(id => {
    userIds.push(mongoose.Types.ObjectId(id));
  });

  UserModel.find({'_id': { $in: userIds}}, (err, users) => {
    if(err){
      // having orphaned records here isn't the worst
      // return next(err);
    }
    users.map(user => {
      removeAllAccess(user, project._id);
      user.save();
    });
  });
}

function removeAllAccess(user, projectId){
  user.adminProjectAccess = removeFromList(user.adminProjectAccess, projectId);
  user.useProjectAccess = removeFromList(user.useProjectAccess, projectId);
  user.readProjectAccess = removeFromList(user.readProjectAccess, projectId);
}

function removeFromList(list, value){
  return list.filter(val => val+"" !== value+"");
}
