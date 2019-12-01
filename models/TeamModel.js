
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const TeamSchema = new mongoose.Schema(
{
    teamname: {type:String, required:true, trim:true},
    description: {type:String, default:"", trim:true},
    timestamp: {type:Date, default:Date.now},
    members: [{type:ObjectId, ref:"User"}],
    projectAccess: [{type:ObjectId, ref:"Project"}],
    listAccess: [{type:ObjectId, ref:"List"}]
},
{
  collection: "teams"
});

module.exports = mongoose.model("Team", TeamSchema);
