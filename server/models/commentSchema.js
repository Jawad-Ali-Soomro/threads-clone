const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
