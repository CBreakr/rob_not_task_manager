
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const api = require("./api/api");
const auth = require("./config/auth")(passport);

// DB

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

const PORT = 5000;
const SESSION_SECRET = process.env.SESSION_SECRET
                      || "lyg7o6twergvweflyi";

const app = express();

// SESSION

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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
  // serve any static files
  app.use(express.static(path.join(__dirname, "taskmanager-app/build")));

  // route to React app
  app.get("*", (req, res, next) => {
    res.sendFind(path.join(__dirname, "taskmanager-app/build", "index.html"));
  });
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
