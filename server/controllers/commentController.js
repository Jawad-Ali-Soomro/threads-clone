const Comment = require("../models/commentSchema");
const Thread = require("../models/threadModel");

exports.createComment = async (req, res) => {
  try {
    const { content, authorId, threadId } = req.body;
    const createdComment = await Comment.create({
      content,
      author: authorId,
      thread: threadId,
    });
    const findThreat = await Thread.findById(threadId);
    findThreat.comments.push(createdComment?._id);
    await findThreat.save();

    return res.json({ createdComment });
  } catch (error) {
    res.json({
      error,
    });
  }
};
