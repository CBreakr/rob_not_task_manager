
const ProjectModel = require("../../models/ProjectModel");
const ListModel = require("../../models/ListModel");

module.exports = removeLists = (projectId, next) => {
  console.log("remove lists", {projectId});
  ListModel.find({parentProject:projectId}, (err, lists) => {
    console.log("lists find", {lists});
    if(err){
      return next(err);
    }
    lists.map(list => {
      console.log("remove list", {list});
      list.deleteOne();
    });
  });
}
