
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const TeamSchema = new mongoose.Schema(
{
    _id: {type:String, default:uuidv4()},
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
