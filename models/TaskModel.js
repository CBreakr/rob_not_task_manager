
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Task = new mongoose.Schema(
{
  _id: {type:String, default:uuidv4()},
  title: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  priority: {type:String, default:"standard", trim:true},
  size: {type:Number, default:1},
  status: {type:String, default:"created", trim:true},
  type: {type:String, required:true, trim:true},
  dueDate: {type:Date, default:null},
  createdBy: {type:ObjectId, ref:"User", required:true},
  assignedToUsers: [{type:ObjectId, ref:"User"}],
  assignedToTeams: [{type:ObjectId, ref:"Team"}],
  parentList: {type:ObjectId, ref:"List", required:true},
  timestamp: {type:Date, default:Date.now},
  tags: [{type:ObjectId, ref:"Tags"}]
},
{
  collection: "tasks"
});

module.exports = mongoose.model("Task", Task);
