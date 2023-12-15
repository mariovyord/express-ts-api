import mongoose, { Schema, Types, model } from "mongoose";
import { IComment } from "./comment-types";

mongoose.Schema.Types.String.set("trim", true);

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "Comment can't be empty"],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: [true, "Article ID is required"],
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
