
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ListModel = require("./ListModel");

const ProjectSchema = new mongoose.Schema(
{
  projectname: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  createdBy: {type:ObjectId, ref:"User", required:true},
  lists: [{type:ObjectId, ref:"List"}],
  timestamp: {type:Date, default:Date.now}
},
{
  collection: "projects"
});

/*
ProjectSchema.pre("deleteOne", {document:true}, (next) => {
  const projectId = this._id;
  console.log(`after removal of project ${projectId}`, {project:this});
  ListModel.find({parentProject:projectId}, (err, lists) => {
    if(err){
      // hmmm.... we have orphaned records now?
      console.log("error cascading project delete to lists", {err});
    }
    console.log("remove the lists related to this project");
    lists.map(list => {
      console.log("project list", list._id);
      ListModel.deleteOne({_id:list._id}, (err, result) => {
        if(err) {
          console.log("error on project delete cascade", {err});
        }
      });
    });
  });
});
*/

module.exports = mongoose.model("Project", ProjectSchema);
