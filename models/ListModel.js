
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ListSchema = new mongoose.Schema(
{
  _id: {type:String, default:uuidv4()},
  listname: {type:String, required:true, trim:true},
  description: {type:String, default:"", trim:true},
  parentProject: {type:ObjectId, ref:"Project", required:true},
  timestamp: {type:Date, default:Date.now}
},
{
  collection: "lists"
});

module.exports = mongoose.model("List", ListSchema);
