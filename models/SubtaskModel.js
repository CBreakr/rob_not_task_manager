
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Subtask = new mongoose.Schema(
{
  description: {type:String, required:true, trim:true},
  completed: {type:Boolean, default:false},
  parentTask: {type:ObjectId, ref:"Task", required:true},
  timestamp: {type:Date, default:Date.now}
},
{
  collection:"subtasks"
});

module.exports = mongoose.model("Subtask", Subtask);
