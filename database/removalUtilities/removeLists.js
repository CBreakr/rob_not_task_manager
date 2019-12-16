
const ListModel = require("../../models/ListModel");
const removeTasks = require("./removeTasks");

/*

After a project is deleted, its child lists need to be removed as well

*/

module.exports = removeLists = (projectId, user, next) => {
  ListModel.find({parentProject:projectId}, (err, lists) => {    if(err){
      // having orphaned records here isn't the worst
      // so don't push here
      // return next(err);
    }
    lists.map(list => {
      list.deleteOne();
      // delete the task children of each list as well
      removeTasks(list._id, next);
    });
  });
}
