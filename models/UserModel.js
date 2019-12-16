
const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
{
  email: {type:String, required:true, trim:true},
  password: {type:String, required:true},
  timestamp: {type:Date, default:Date.now},
  readProjectAccess: [{type:ObjectId, ref:"Project"}],
  useProjectAccess: [{type:ObjectId, ref:"Project"}],
  adminProjectAccess: [{type:ObjectId, ref:"Project"}],
},
{
  collection: "users"
});

module.exports = mongoose.model("User", UserSchema);
