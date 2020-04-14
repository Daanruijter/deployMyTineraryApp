const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //not sure whether I need this and I think the reference is not correct//
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      //not sure whether I need this and I think the reference is not correct//
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //not sure whether I need this and I think the reference is not correct//
    },
    content: {
      type: String,
    },
    userData: {
      type: Object,
    },
    commentMoment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
