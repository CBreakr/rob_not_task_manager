
const UserModel = require("../models/UserModel");
const ListModel = require("../models/ListModel");

const removeTasks = require("./removalUtilities/removeTasks");

const listInteraction = {
  get: getLists,
  post: postList,
  put: putList,
  delete: deleteList
};

//
//
//
function getLists(res, next, projectId, userId){
  // first need to check the user and the project
  // then need to load the lists for the project

  UserModel.findById(userId)
  .then(user => {
    // make sure the user has access

    const allProjects = [...user.adminProjectAccess, ...user.useProjectAccess, ...user.readProjectAccess];
    if(allProjects.find(access => access._id == projectId)){
      // get the lists
      // then also check the lists against the user's access
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
//
//
function postList(res, next, projectId, userId, list){
  UserModel.findById(userId)
  .then(user => {
    console.log("we have a user for list entry");
    const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
    if(projectAccess.find(access => access._id == projectId)){
      console.log("user has access to this project for list entry");
      list.createdBy = user._id;
      list.parentProject = projectId;
      ListModel.create(list, (err, entry) => {
        if(err){
          console.log("error on list creation", {err});
          return next(err);
        }
        console.log("list created");

        return res.json({newList:entry});
      })
    }
  });
}

//
//
//
function putList(res, next, userId, list){
  UserModel.findById(userId)
  .then(user => {
    // make sure the user has access
    const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
    // if(user.adminListAccess.find(access => access._id == list._id)){
    if(projectAccess.find(access => access._id == list.parentProject)){
      ListModel.findById(list._id, (err, entry) => {
        if(err){
          return next(err);
        }

        entry.listname = list.listname;
        entry.description = list.description;
        entry.save();

        return res.json({message:"list updated"});
      });
    }
  })
  .catch(err => next(err));
}

//
//
//
function deleteList(res, next, userId, listId){
  UserModel.findById(userId)
  .then(user => {
    console.log("we have the user for delete");
    ListModel.findById(listId, (err, list) => {
      console.log("we have a list to delete");
      if(err){
        console.log("error finding list for deletion", {err});
        return next(err);
      }

      if(user.adminProjectAccess.find(access => {
        console.log("test id match", {access:access._id, pp: list.parentProject});
        return access._id+"" == list.parentProject+""
      })){
        list.deleteOne()
        .then(result => {
          console.log("DELETE ONE LIST: THEN");
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

module.exports = listInteraction;
