const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "comment",
    },
    reply: {
      type: String,
      required: true,
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = replyModel = mongoose.model("reply", replySchema);
