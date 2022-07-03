const replySchema = require("../models/replySchema");

const replyController = {};

replyController.createReply = async (req, res) => {
  try {
    const { commentId, reply } = req.body;
    const replySave = new replySchema({
      commentId,
      reply,
      repliedBy: req.user._id,
    });
    const replies = await replySave.save();
    res.status(201).send(replies);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = replyController;
