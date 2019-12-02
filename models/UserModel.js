
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
{
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
