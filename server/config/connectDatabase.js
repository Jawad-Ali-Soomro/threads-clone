const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected");
  });
};

module.exports = connectDatabase;
