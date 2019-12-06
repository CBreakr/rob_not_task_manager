
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Task = new mongoose.Schema(
{
  taskname: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  priority: {type:String, default:"standard", trim:true},
  size: {type:Number, default:1},
  status: {type:String, default:"unstarted", trim:true},
  type: {type:String, default:"task", trim:true},
  dueDate: {type:Date, default:null},
  createdBy: {type:ObjectId, ref:"User", required:true},
  assignedToUsers: [{type:ObjectId, ref:"User"}],
  parentList: {type:ObjectId, ref:"List", required:true},
  timestamp: {type:Date, default:Date.now},
  tags: [{type:ObjectId, ref:"Tags"}]
},
{
  collection: "tasks"
});

module.exports = mongoose.model("Task", Task);
