
const express = require("express");

const router = express.Router();

const UserModel = require("../models/UserModel");
const ProjectModel = require("../models/ProjectModel");
const ListModel = require("../models/ListModel");

router.get("/", (req, res, next) => {
  if(req.user) {
    const { user } = req;

    // get the user from the DB as a source
    UserModel.findById(user._id)
    .populate({
      path:"projectAccess"
    })
    .exec()
    .then(user => {
      return res.json({projects: user.projectAccess});
    })
    .catch(err => console.log("error: project GET, find user", {err}));
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

router.post("/", (req, res, next) => {
  if(req.body && req.user && req.body.project){
    const {project} = req.body;
    project.createdBy = req.user._id;

    UserModel.findById(req.user._id)
    .then(user => {
      ProjectModel.create(project, (err, entry) => {
        if(err) {
          return next(err);
        }
        user.projectAccess.push(entry._id);
        user.save();

        // and I also need to create a default list for the project
        const defaultList = {
          listname: `${entry.projectname} base list`,
          description: `default list for the ${entry.projectname} project`,
          parentProject: entry._id,
          createdBy: user._id,
        }

        ListModel.create(defaultList, (err, list) => {
          if(err) {
            // don't worry about this, since it doesn't really harm anything
          }
          else{
            consoe.log("list created", {list});
            // give the user access to this default list
            user.listAccess.push(list._id);
            user.save();
          }
        });

        return res.json({newProject: entry});
      });
    })
    .catch(err => next(err));
  }
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

router.put("/", (req, res, next) => {
  if(req.body && req.user && req.body.project){
    const { project } = req.body;

    UserModel.findById(req.user._id)
    .then(user => {
      // make sure the user has access
      if(user.projectAccess.find(access => access._id == project._id)){
        ProjectModel.findById(project._id, (err, entry) => {
          if(err){
            return next(err);
          }

          entry.projectname = project.projectname;
          entry.description = project.description;
          entry.save();

          return res.json({message:"project updated"});
        });
      }
    })
    .catch(err => next(err));
  }
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

router.delete("/:id", (req, res, next) => {
  if(req.user){
    const projectId = req.params.id;
    console.log("delete call", {projectId});
    UserModel.findById(req.user._id)
    .then(user => {
      console.log("we have the user for delete");
      // make sure the user has access
      if(user.projectAccess.find(access => access._id == projectId)){
        console.log("we have a project to delete");
        ProjectModel.deleteOne({_id:req.params.id}, (err, result) => {
          if(err){
            console.log("error deleteing", {err});
            return next(err);
          }
          return res.json({message:"deletion successful"});
        });
      }
      else{
        console.log("could not find the project to delete");
      }
    })
    .catch(err => next(err));
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

module.exports = router;
