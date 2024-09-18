const Thread = require("../models/threadModel");
const User = require("../models/userModel");

exports.createThread = async (req, res) => {
  const { title, content, image, author } = req.body;
  const createdThread = await Thread.create({ title, content, image, author });
  const insertThread = await User.findById(author);
  insertThread.threads.push(createdThread?._id);
  await insertThread.save();
  if (!createdThread) {
    return res.json({ message: "Error creating thread" });
  } else {
    return res.json({ message: "Thread created", createdThread });
  }
};

exports.getAllThreads = async (req, res) => {
  const foundThreads = await Thread.find({}).populate("author");
  return res.json({
    foundThreads,
  });
};

exports.likeUnlikeThread = async (req, res) => {
  const { threadId } = req.params; // threadId from URL parameters
  const { userId } = req.body; // assuming you have user info from auth middleware

  try {
    const thread = await Thread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    const isLiked = thread.likedBy.includes(userId);

    if (isLiked) {
      thread.likedBy = thread.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      thread.likedBy.push(userId);
    }
    await thread.save();
    return res.status(200).json({
      message: isLiked ? "Thread unliked" : "Thread liked",
      likedBy: thread.likedBy,
      likeCount: thread.likedBy.length,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getThreadById = async (req, res) => {
  const { threadId } = req.params;
  const foundThread = await Thread.findById(threadId)
    .populate("author")
    .populate("likedBy");
  return res.json({ foundThread });
};
