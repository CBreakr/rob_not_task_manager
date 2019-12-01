
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const Tag = new mongoose.Schema(
{
  name: {type:String, required:true, trim:true},
  projects: [{type:ObjectId, ref:"Project"}]
},
{
  collection: "tags"
});

module.exports = mongoose.model("Tag", Tag);
