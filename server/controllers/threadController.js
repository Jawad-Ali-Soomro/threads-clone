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
  try {
    const { threadId } = req.params;

    // Fetch the thread by ID and populate author, likedBy, and comments
    const foundThread = await Thread.findById(threadId)
      .populate({
        path: "author", // Populate the thread's author
        select: "name email bio avatar", // Specify the fields to include from the author
      })
      .populate("likedBy") // Populate likedBy field with selected fields (optional)
      .populate({
        path: "comments", // Populate comments
        populate: {
          path: "author", // Populate the author field inside each comment
          select: "username email bio avatar", // Specify which fields to include from the author
        },
      });

    if (!foundThread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.json({ foundThread });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
