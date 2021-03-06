
const express = require("express");

const router = express.Router();

const listInteraction = require("../database/listInteraction");

//
// get the lists that are within the given project
//
router.get("/byproject/:id", (req, res, next) => {
  if(req.user){
    const projectId = req.params.id;
    const userId = req.user._id;

    listInteraction.get(res, next, projectId, userId);
  }
  else{
    next(new Error("invalid request: no user"));
  }
});

//
// create a new list within the specified project
//
router.post("/", (req, res, next) => {
  if(req.user && req.body && req.body.list && req.body.projectId){
    const { list, projectId } = req.body;
    const userId = req.user._id;
    listInteraction.post(res, next, projectId, userId, list);
  }
  else{
    next(new Error("invalid request: no user and/or no list or projectId"));
  }
});

//
// edit the specified list
//
router.put("/", (req, res, next) => {
  if(req.body && req.user && req.body.list){
    const { list } = req.body;
    const userId = req.user._id;
    listInteraction.put(res, next, userId, list);
  }
  else{
    next(new Error("invalid request: no project and/or no user"));
  }
});

//
// delete the specified list
//
router.delete("/:id", (req, res, next) => {
  if(req.user){
    const listId = req.params.id;
    const userId = req.user._id;
    listInteraction.delete(res, next, userId, listId);
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

module.exports = router;
