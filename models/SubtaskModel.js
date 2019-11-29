
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Subtask = new mongoose.Schema(
{
  _id: {type:String, default:uuidv4()},
  description: {type:String, required:true, trim:true},
  completed: {type:Boolean, default:false},
  parentTask: {type:ObjectId, ref:"Task", required:true},
  timestamp: {type:Date, default:Date.now}
},
{
  collection:"subtasks"
});

module.exports = mongoose.model("Subtask", Subtask);
