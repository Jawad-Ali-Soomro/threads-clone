const express = require("express");
const connectDatabase = require("./config/connectDatabase");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const threadRoute = require("./routes/threadRoute");
require("dotenv").config({ path: "./config/.env" });

const app = express();
connectDatabase();

app.use(express.json());
app.use(cors());

// Correctly apply router
app.use("/api/user", userRoute);
app.use("/api/thread", threadRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
