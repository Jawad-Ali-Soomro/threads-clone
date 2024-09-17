const express = require("express");
const {
  createThread,
  getAllThreads,
} = require("../controllers/threadController");
const threadRoute = express.Router();

threadRoute.post("/create", createThread);
threadRoute.get("/all", getAllThreads);

module.exports = threadRoute;
