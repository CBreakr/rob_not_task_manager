
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new mongoose.Schema(
{
  projectname: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  createdBy: {type:ObjectId, ref:"User", required:true},
  timestamp: {type:Date, default:Date.now}
},
{
  collection: "projects"
});

module.exports = mongoose.model("Project", ProjectSchema);
