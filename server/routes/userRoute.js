const express = require("express");
const {
  createUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/create", createUser);
userRoute.post("/login", loginUser);
userRoute.post("/get/profile", getProfile);

module.exports = userRoute;
