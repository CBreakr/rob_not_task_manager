
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Tag = new mongoose.Schema(
{
  _id: {type:String, default:uuidv4()},
  name: {type:String, required:true, trim:true},
  projects: [{type:ObjectId, ref:"Project"}]
},
{
  collection: "tags"
});

module.exports = mongoose.model("Tag", Tag);
