
const TaskModel = require("../../models/TaskModel");

module.exports = removeTasks = (listId, next) => {
  console.log("remove tasks", {listId});
  TaskModel.find({parentList:listId}, (err, tasks) => {
    console.log("tasks find", {tasks});
    if(err){
      // having orphaned records here isn't the worst
      // return next(err);
    }
    tasks.map(task => {
      console.log("remove task", {task});
      task.deleteOne();
    });
  });
}
