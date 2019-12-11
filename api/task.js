
const express = require("express");

const router = express.Router();

const TaskModel = require("../models/TaskModel");
const ListModel = require("../models/ListModel");
const UserModel = require("../models/UserModel");

const taskInteraction = require("../database/taskInteraction");

//
//
//
router.get("/bylist/:id", (req, res, next) => {
  if(req.user){
    const userId = req.user._id;
    const listId = req.params.id;
    taskInteraction.get(res, next, userId, listId);
  }
  else{
    next(new Error("invalid request: no user"));
  }
});

//
//
//
router.post("/", (req, res, next) => {
  if(req.user && req.body && req.body.task && req.body.listId){
    const { task, listId } = req.body;
    const userId = req.user._id;
    taskInteraction.post(res, next, userId, listId, task);
  }
  else{
    next(new Error("invalid request: no user and/or no list or projectId"));
  }
});

//
//
//
router.put("/", (req, res, next) => {
  if(req.body && req.user && req.body.task){
    const { task } = req.body;
    const userId = req.user._id;
    taskInteraction.put(res, next, userId, task);
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
    const taskId = req.params.id;
    taskInteraction.delete(res, next, userId, taskId);
  }
  else {
    next(new Error("invalid request: no user"));
  }
});

module.exports = router;
