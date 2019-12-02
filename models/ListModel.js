
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ListSchema = new mongoose.Schema(
{
  listname: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  parentProject: {type:ObjectId, ref:"Project", required:true},
  tasks: [{type:ObjectId, ref:"Task"}],
  createdBy: {type:ObjectId, ref:"User", required:true},
  timestamp: {type:Date, default:Date.now}
},
{
  collection: "lists"
});

module.exports = mongoose.model("List", ListSchema);
