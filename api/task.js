
const express = require("express");

const router = express.Router();

const TaskModel = require("../models/TaskModel");
const ListModel = require("../models/ListModel");
const UserModel = require("../models/UserModel");

router.get("/:id", (req, res, next) => {

});

router.get("/bylist/:id", (req, res, next) => {

  if(req.user){
    const listId = req.params.id;

    // first need to check the user and the project
    // then need to load the lists for the project

    UserModel.findById(req.user._id)
    .then(user => {
      // make sure the user has access
      ListModel.findById(listId, (err, list) => {
        if(err){
          console.log("error finding list for tasks");
          return next(err);
        }

        const allProjects = [...user.adminProjectAccess, ...user.useProjectAccess, ...user.readProjectAccess];

        if(allProjects.find(access => access._id+"" == list.parentProject+"")){
          // get the lists
          // then also check the lists against the user's access
          TaskModel.find({parentList:listId}, null, {sort: {status:-1}}, (err, tasks) => {
            if(err){
              return next(err);
            }

            return res.json({tasks});
          });
        }
        else{
          console.log("invalid user rights: TASK GET");
        }
      });
    })
    .catch(err => next(err));
  }
  else{
    next(new Error("invalid request: no user"));
  }
});

router.post("/", (req, res, next) => {
  if(req.user && req.body && req.body.task && req.body.listId){
    console.log("we have task and listId for create");
    const { task, listId } = req.body;
    UserModel.findById(req.user._id)
    .then(user => {
      console.log("we have a user for task entry");

      ListModel.findById(listId, (err, list) => {
        const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
        if(projectAccess.find(access => access._id+"" == list.parentProject+"")){
          console.log("user has access to this list for task entry", {task});
          task.createdBy = user._id;
          task.parentList = listId;
          TaskModel.create(task, (err, entry) => {
            if(err){
              console.log("error on task creation", {err});
              return next(err);
            }
            console.log("task created");

            return res.json({newTask:entry});
          })
        }
        else{
          console.log("invalid user rights: TASK POST");
        }
      });
    })
  }
  else{
    next(new Error("invalid request: no user and/or no list or projectId"));
  }
});

router.put("/", (req, res, next) => {
  if(req.body && req.user && req.body.task){
    const { task } = req.body;

    UserModel.findById(req.user._id)
    .then(user => {
      // make sure the user has access
      ListModel.findById(task.parentList, (err, list) => {
        const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
        if(projectAccess.find(access => access._id+"" == list.parentProject+"")){
          TaskModel.findById(task._id, (err, entry) => {
            if(err){
              return next(err);
            }

            //
            //
            //
            //
            //
            // fill in the Task values
            //
            //
            //
            //
            //
            entry.taskname = task.taskname;
            entry.description = task.description;
            entry.status = task.status;
            entry.priority = task.priority;
            entry.size = task.size;
            entry.type = task.type;
            entry.dueDate = task.dueDate;
            entry.save();

            return res.json({message:"task updated"});
          });
        }
        else{
          console.log("invalid user rights: TASK PUT");
        }
      });
    })
    .catch(err => next(err));
  }
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

router.delete("/:id", (req, res, next) => {
  if(req.user){
    const taskId = req.params.id;
    console.log("delete call", {taskId});
    UserModel.findById(req.user._id)
    .then(user => {
      console.log("we have the user for delete");
      TaskModel.findById(taskId, (err, task) => {
        if(err){
          console.log("error finding task for deletion", {err});
          return next(err);
        }

        console.log("we have a task to delete");

        ListModel.findById(task.parentList, (err, list) => {
          // make sure the user has access
          if(user.adminProjectAccess.find(access => access._id.equals(list.parentProject))){
            console.log("user has access to delete this task");
            task.deleteOne();
            return res.json({message:"deletion successful"});
          }
          else{
            console.log("no user access to delete TASK");
          }
        });
      });
    })
    .catch(err => next(err));
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

module.exports = router;
