const express = require("express");
const { createComment } = require("../controllers/commentController");
const commentRoute = express.Router();

commentRoute.post("/create", createComment);

module.exports = commentRoute;
