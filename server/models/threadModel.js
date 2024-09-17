const mongoose = require("mongoose");
const threadSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;
