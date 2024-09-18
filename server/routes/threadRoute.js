const express = require("express");
const {
  createThread,
  getAllThreads,
  likeUnlikeThread,
  getThreadById,
} = require("../controllers/threadController");
const threadRoute = express.Router();

threadRoute.post("/create", createThread);
threadRoute.get("/all", getAllThreads);
threadRoute.get("/get/:threadId", getThreadById);
threadRoute.put("/:threadId/like", likeUnlikeThread);

module.exports = threadRoute;
