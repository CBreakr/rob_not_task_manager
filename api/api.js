
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({message:"GET"});
});

router.post("/", (req, res, next) => {
  const body = req.body;

  res.json({message:"POST", body});
});

module.exports = router;
