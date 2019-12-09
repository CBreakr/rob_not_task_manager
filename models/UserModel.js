
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
{
  email: {type:String, required:true, trim:true},
  password: {type:String, required:true},
  timestamp: {type:Date, default:Date.now},
  readProjectAccess: [{type:ObjectId, ref:"Project"}],
  // readListAccess: [{type:ObjectId, ref:"List"}],
  useProjectAccess: [{type:ObjectId, ref:"Project"}],
  // useListAccess: [{type:ObjectId, ref:"List"}],
  adminProjectAccess: [{type:ObjectId, ref:"Project"}],
  // adminListAccess: [{type:ObjectId, ref:"List"}],
},
{
  collection: "users"
});

module.exports = mongoose.model("User", UserSchema);
