
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new mongoose.Schema(
{
  _id: {type:String, default:uuidv4()},
  projectname: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  createdBy: {type:ObjectId, ref:"User", required:true},
  timestamp: {type:Date, default:Date.now}
},
{
  collection: "projects"
});

module.exports = mongoose.model("Project", ProjectSchema);
