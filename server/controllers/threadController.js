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
