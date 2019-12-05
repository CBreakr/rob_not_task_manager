
const ListModel = require("../../models/ListModel");
const removeTasks = require("./removeTasks");

const objIdMatch = require("../../utilities/objectIdMatch");

module.exports = removeLists = (projectId, user, next) => {
  console.log("remove lists", {projectId, user});
  ListModel.find({parentProject:projectId}, (err, lists) => {
    console.log("lists find", {lists});
    if(err){
      // having orphaned records here isn't the worst
      // return next(err);
    }
    lists.map(list => {
      console.log("remove list", {list});
      list.deleteOne();
      // remove the listaccess here, too
      user.listAccess = user.listAccess.filter(la => {
        // return la+"" !== list._id+"";
        return !objIdMatch(la, list._id);
      });
      user.save();
      removeTasks(list._id, next);
    });
  });
}
