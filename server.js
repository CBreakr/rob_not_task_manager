
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const api = require("./api/api");

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


const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api", api);

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

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
