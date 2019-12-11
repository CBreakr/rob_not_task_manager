
const TaskModel = require("../../models/TaskModel");

/*

After a list is deleted, its child tasks need to be removed as well

*/

module.exports = removeTasks = (listId, next) => {
  TaskModel.find({parentList:listId}, (err, tasks) => {
    if(err){
      // having orphaned records here isn't the worst
      // return next(err);
    }
    tasks.map(task => {
      task.deleteOne();
    });
  });
}
