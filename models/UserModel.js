
const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const User = new mongoose.Schema({
  _id: {type:String, default: uuidv4()},
  email: {type:String, required: true},
  password: {type:String, require:true},
  timestamp: {type:Date, default: Date.now}
},
{
  collection: "users"
});

module.exports = mongoose.model("User", User);
