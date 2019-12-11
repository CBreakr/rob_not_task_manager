
const express = require("express");

const router = express.Router();

const projectInteraction = require("../database/projectInteraction");

//
//
//
router.get("/", (req, res, next) => {
  if(req.user) {
    const { user } = req;
    projectInteraction.get(res, next, user);
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

//
//
//
router.post("/", (req, res, next) => {
  if(req.body && req.user && req.body.project){
    const {project} = req.body;
    const userId = req.user._id;
    projectInteraction.post(res, next, project, userId);
  }
  else{
    console.log({user:req.user, body:req.body});
    next(new Error("invalid request: no project and/or no user"));
  }
});

//
//
//
router.put("/", (req, res, next) => {
  if(req.body && req.user && req.body.project){
    const { project } = req.body;
    const userId = req.user._id;
    projectInteraction.put(res, next, project, userId);
  }
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

//
//
//
router.delete("/:id", (req, res, next) => {
  if(req.user){
    const userId = req.user._id;
    const projectId = req.params.id;
    projectInteraction.delete(res, next, projectId, userId);
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

module.exports = router;
