const commentSchema = require("../models/commentSchema");

const commentController = {};

commentController.createComments = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const commentSave = new commentSchema({
      postId,
      comment,
      commentedBy: req.user._id,
    });
    const comments = await commentSave.save();
    //     console.log(comments);
    res.status(201).send(comments);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = commentController;
