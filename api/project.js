
const express = require("express");

const router = express.Router();

const UserModel = require("../models/UserModel");
const ProjectModel = require("../models/ProjectModel");
const ListModel = require("../models/ListModel");

router.get("/", (req, res, next) => {
  const { user } = req;

  // get the user from the DB as a source
  UserModel.findById(user._id)
  .populate({
    path:"projectAccess",
    populate: {
      path: "createdBy"
    }
  })
  .exec()
  .then(user => {
    return res.json({projects: user.projectAccess});
  })
  .catch(err => console.log("error: project GET, find user", {err}));
});

router.get("/:id", (req, res, next) => {

});

router.post("/", (req, res, next) => {
  console.log("project POST req", {body: req.body}, {user:req.user});
  if(req.body && req.user && req.body.project){
    const {project} = req.body;
    project.createdBy = req.user._id;

    console.log("project POST", {project});

    UserModel.findById(req.user._id)
    .then(user => {
      ProjectModel.create(project, (err, entry) => {
        if(err) {
          return next(err);
        }
        user.projectAccess.push(entry._id);
        user.save();
        return res.json({newProject: entry});
      });
    })
    .catch(err => next(err));
  }
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

router.put("/:id", (req, res, next) => {
  if(req.body && req.user && req.body.project){
    const { project } = req.body;
    project.createdBy = req.user._id;

    console.log("project POST", {project});

    UserModel.findById(user._id)
    .then(user => {
      // make sure the user has access
      if(user.projectAccess.find(access => access._id === project._id)){
        ProjectModel.findOneAndUpdate({_id:project._id}, {$set: {project}}, (err, entry) => {
          if(err) {
            return next(err);
          }
          return res.json({newProject: entry});
        });
      }
    })
    .catch(err => next(err));
  }
  next(new Error("invalid request: no project and/or no user"));
});

router.delete("/:id", (req, res, next) => {

});

module.exports = router;
