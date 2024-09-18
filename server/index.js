const express = require("express");
const connectDatabase = require("./config/connectDatabase");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const threadRoute = require("./routes/threadRoute");
const commentRoute = require("./routes/commentRoute");
require("dotenv").config({ path: "./config/.env" });

const app = express();
connectDatabase();

app.use(express.json());
app.use(cors());

// Correctly apply router
app.use("/api/user", userRoute);
app.use("/api/thread", threadRoute);
app.use("/api/comment", commentRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
