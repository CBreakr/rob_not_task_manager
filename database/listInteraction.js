
const UserModel = require("../models/UserModel");
const ListModel = require("../models/ListModel");

const cleanValue = require("../formatUtilities/cleanUserInput");
const removeTasks = require("./removalUtilities/removeTasks");

//
// expose these to the outside
//
const listInteraction = {
  get: getLists,
  post: postList,
  put: putList,
  delete: deleteList
};

//
// make sure the user has access, then get the lists
//
function getLists(res, next, projectId, userId){
  UserModel.findById(userId)
  .then(user => {
    // make sure the user has access to the project
    // any of the access types will do
    const allProjects = [...user.adminProjectAccess, ...user.useProjectAccess, ...user.readProjectAccess];
    if(allProjects.find(access => access._id == projectId)){
      ListModel.find({parentProject:projectId}, (err, lists) => {
        if(err){
          return next(err);
        }
        return res.json({lists});
      });
    }
  })
  .catch(err => next(err));
}

//
// make sure the user has access to add lists, then create a new one
//
function postList(res, next, projectId, userId, list){
  UserModel.findById(userId)
  .then(user => {
    // either admin or use (create/edit) access required
    const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
    if(projectAccess.find(access => access._id == projectId)){
      list.listname = cleanValue(list.listname);
      list.description = cleanValue(list.description);
      list.createdBy = user._id;
      list.parentProject = projectId;
      ListModel.create(list, (err, entry) => {
        if(err){
          console.log("error on list creation", {err});
          return next(err);
        }

        return res.json({newList:entry});
      })
    }
  });
}

//
// make sure the user has access to update lists, then run the update
//
function putList(res, next, userId, list){
  UserModel.findById(userId)
  .then(user => {
    // either admin or use (create/edit) access required
    const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
    if(projectAccess.find(access => access._id == list.parentProject)){
      ListModel.findById(list._id, (err, entry) => {
        if(err){
          return next(err);
        }

        // update the individual values
        entry.listname = cleanValue(list.listname);
        entry.description = cleanValue(list.description);
        entry.save();

        return res.json({message:"list updated"});
      });
    }
  })
  .catch(err => next(err));
}

//
// make sure the user has admin access, then delete the list
// cascade the delete to any child tasks
//
function deleteList(res, next, userId, listId){
  UserModel.findById(userId)
  .then(user => {
    ListModel.findById(listId, (err, list) => {
      if(err){
        console.log("error finding list for deletion", {err});
        return next(err);
      }

      // only admin access is good enough for delete
      if(user.adminProjectAccess.find(access => {
        return access._id+"" == list.parentProject+""
      })){
        list.deleteOne()
        .then(result => {
          // also remove child tasks
          removeTasks(listId, next);
        });

        return res.json({message:"deletion successful"});
      }
      else{
        console.log("invalid user access: LIST DELETE");
      }
    });
  })
  .catch(err => next(err));
}

//
// EXPORT
//
module.exports = listInteraction;
