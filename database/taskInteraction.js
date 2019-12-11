
const TaskModel = require("../models/TaskModel");
const ListModel = require("../models/ListModel");
const UserModel = require("../models/UserModel");

const taskInteraction = {
  get: getTasks,
  post: postTask,
  put: putTask,
  delete: deleteTask
};

//
//
//
function getTasks(res, next, userId, listId) {
  // first need to check the user and the project
  // then need to load the lists for the project

  UserModel.findById(userId)
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

//
//
//
function postTask(res, next, userId, listId, task) {
  UserModel.findById(userId)
  .then(user => {
    ListModel.findById(listId, (err, list) => {
      const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
      if(projectAccess.find(access => access._id+"" == list.parentProject+"")){
        task.createdBy = user._id;
        task.parentList = listId;
        TaskModel.create(task, (err, entry) => {
          if(err){
            return next(err);
          }

          return res.json({newTask:entry});
        })
      }
      else{
        console.log("invalid user rights: TASK POST");
      }
    });
  });
}

//
//
//
function putTask(res, next, userId, task) {
  UserModel.findById(userId)
  .then(user => {
    // make sure the user has access
    ListModel.findById(task.parentList, (err, list) => {
      const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
      if(projectAccess.find(access => access._id+"" == list.parentProject+"")){
        TaskModel.findById(task._id, (err, entry) => {
          if(err){
            return next(err);
          }

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

//
//
//
function deleteTask(res, next, userId, taskId) {
  UserModel.findById(userId)
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

module.exports = taskInteraction;
