
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  _id: {type:String, default:uuidv4()},
  email: {type:String, required:true, trim:true},
  password: {type:String, required:true},
  timestamp: {type:Date, default:Date.now},
  projectAccess: [{type:ObjectId, ref:"Project"}],
  listAccess: [{type:ObjectId, ref:"List"}]
},
{
  collection: "users"
});

module.exports = mongoose.model("User", UserSchema);
