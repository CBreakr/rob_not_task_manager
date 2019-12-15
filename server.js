
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const fs = require("fs");

const api = require("./api/api");
const auth = require("./config/auth")(passport);

// DB CONNECTION

const DB = process.env.DB_CONNECT
          || "mongodb://localhost/taskmanager";

mongoose.connect(
  DB,
  {useNewUrlParser:true, useUnifiedTopology:true},
  (err, data) => {
    if(err){
      console.log("error connecting to DB", err);
      return;
    }

    console.log("DB connection successful");
  }
);

// BASIC APP SERVER

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET
                      || "lyg7o6twergvweflyi";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// LOGIN & SESSION

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// API ROUTE

app.use("/api", api);

app.get("/getuser", (req, res, next) => {
  if(req.user){
    return res.json({user:req.user});
  }
  else{
    return res.json({message:"no user"});
  }
});

//
// on production make sure we're hooked up
//
if(process.env.NODE_ENV === "production") {
  console.log("we're in production mode");
  // serve any static files
  app.use(express.static(path.join(__dirname, "taskmanager-app/build")));

  // route to React app
  app.get("*", (req, res, next) => {
    const file = path.join(__dirname, "taskmanager-app/build", "index.html");
    res.sendFind(file);
  });
}
else{
  console.log("we're not in production mode");
}

// handle error (with next)
app.use((err, req, res, next) => {
  console.log("error handler", err);
  return res.json({error:err});
});

// finally, LISTEN
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
