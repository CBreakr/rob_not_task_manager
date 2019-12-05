
const express = require("express");

const router = express.Router();

const UserModel = require("../models/UserModel");
const ListModel = require("../models/ListModel");

const removeTasks = require("./utilities/removeTasks");

router.get("/:id", (req, res, next) => {

});

router.get("/byproject/:id", (req, res, next) => {

  if(req.user){
    const projectId = req.params.id;

    // first need to check the user and the project
    // then need to load the lists for the project

    UserModel.findById(req.user._id)
    .then(user => {
      // make sure the user has access
      if(user.projectAccess.find(access => access._id == projectId)){
        // get the lists
        // then also check the lists against the user's access
        ListModel.find({parentProject:projectId}, (err, lists) => {
          if(err){
            return next(err);
          }

          const accessible = lists.filter(list => {
            return user.listAccess.find(la => {
              return la+"" === list._id+"";
            });
          });

          return res.json({lists:accessible});
        });
      }
    })
    .catch(err => next(err));
  }
  else{
    next(new Error("invalid request: no user"));
  }
});

router.post("/", (req, res, next) => {
  if(req.user && req.body && req.body.list && req.body.projectId){
    console.log("we have list and projectId for create");
    const { list, projectId } = req.body;
    UserModel.findById(req.user._id)
    .then(user => {
      console.log("we have a user for list entry");
      if(user.projectAccess.find(access => access._id == projectId)){
        console.log("user has access to this project for list entry");
        list.createdBy = user._id;
        list.parentProject = projectId;
        ListModel.create(list, (err, entry) => {
          if(err){
            console.log("error on list creation", {err});
            return next(err);
          }
          console.log("list created");
          user.listAccess.push(entry._id);
          user.save();

          return res.json({newList:entry});
        })
      }
    })
  }
  else{
    next(new Error("invalid request: no user and/or no list or projectId"));
  }
});

router.put("/", (req, res, next) => {
  if(req.body && req.user && req.body.list){
    const { list } = req.body;

    UserModel.findById(req.user._id)
    .then(user => {
      // make sure the user has access
      if(user.listAccess.find(access => access._id == list._id)){
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
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

router.delete("/:id", (req, res, next) => {
  if(req.user){
    const listId = req.params.id;
    console.log("delete call", {listId});
    UserModel.findById(req.user._id)
    .then(user => {
      console.log("we have the user for delete");
      // make sure the user has access
      if(user.listAccess.find(access => access._id == listId)){
        console.log("we have a list to delete");
        ListModel.findById(listId, (err, list) => {
          if(err){
            console.log("error finding list for deletion", {err});
            return next(err);
          }
          list.deleteOne();
          removeTasks(listId, next);

          user.listAccess = user.listAccess.filter(la => {
            return la+"" !== list._id+"";
          });
          user.save();

          return res.json({message:"deletion successful"});
        });
      }
      else{
        console.log("could not find the list to delete");
      }
    })
    .catch(err => next(err));
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

module.exports = router;
