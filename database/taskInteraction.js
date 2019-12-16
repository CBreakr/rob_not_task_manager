
const TaskModel = require("../models/TaskModel");
const ListModel = require("../models/ListModel");
const UserModel = require("../models/UserModel");

const cleanValue = require("../formatUtilities/cleanUserInput");

//
// expose these to the outside
//
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

      // any access level is fine
      const allProjects = [...user.adminProjectAccess, ...user.useProjectAccess, ...user.readProjectAccess];

      if(allProjects.find(access => access._id+"" == list.parentProject+"")){
        // get the lists
        // then also check the lists against the user's access
        // sort by "unstarted" first
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
// make sure the user has access to add tasks,
// and then create a new within the specified parent list
//
function postTask(res, next, userId, listId, task) {
  UserModel.findById(userId)
  .then(user => {
    ListModel.findById(listId, (err, list) => {
      // either "use" or "admin" access required
      const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
      if(projectAccess.find(access => access._id+"" == list.parentProject+"")){
        // be sure to clean all user-supplied values
        // to make sure there are no HTML tags
        task.taskname = cleanValue(task.taskname);
        task.description = cleanValue(task.description);
        task.status = cleanValue(task.status);
        task.priority = cleanValue(task.priority);
        task.size = cleanValue(task.size);
        task.type = cleanValue(task.type);
        task.dueDate = cleanValue(task.dueDate);
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
// make sure that the user has access to edit tasks,
// and then update the given task
//
function putTask(res, next, userId, task) {
  UserModel.findById(userId)
  .then(user => {
    // make sure the user has access
    ListModel.findById(task.parentList, (err, list) => {
      // either "use" or "admin" access required
      const projectAccess = [...user.adminProjectAccess, ...user.useProjectAccess];
      if(projectAccess.find(access => access._id+"" == list.parentProject+"")){
        TaskModel.findById(task._id, (err, entry) => {
          if(err){
            return next(err);
          }

          // set the new values
          // make sure they're all clean of HTML tags
          entry.taskname = cleanValue(task.taskname);
          entry.description = cleanValue(task.description);
          entry.status = cleanValue(task.status);
          entry.priority = cleanValue(task.priority);
          entry.size = cleanValue(task.size);
          entry.type = cleanValue(task.type);
          entry.dueDate = cleanValue(task.dueDate);
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
// make sure the user has admin access,
// and then delete the task
//
function deleteTask(res, next, userId, taskId) {
  UserModel.findById(userId)
  .then(user => {
    TaskModel.findById(taskId, (err, task) => {
      if(err){
        console.log("error finding task for deletion", {err});
        return next(err);
      }

      ListModel.findById(task.parentList, (err, list) => {
        // make sure the user has admin access to the parent project
        if(user.adminProjectAccess.find(access => access._id.equals(list.parentProject))){
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

//
// EXPORT
//
module.exports = taskInteraction;
