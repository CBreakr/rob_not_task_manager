
const ListModel = require("../../models/ListModel");
const removeTasks = require("./removeTasks");

module.exports = removeLists = (projectId, next) => {
  console.log("remove lists", {projectId});
  ListModel.find({parentProject:projectId}, (err, lists) => {
    console.log("lists find", {lists});
    if(err){
      // having orphaned records here isn't the worst
      // return next(err);
    }
    lists.map(list => {
      console.log("remove list", {list});
      list.deleteOne();
      removeTasks(list._id, next);
    });
  });
}
