import mongoose, { Schema, Types, model } from "mongoose";

mongoose.Schema.Types.String.set("trim", true);

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, `Title is required`],
      minlength: [3, "Minimum length is 3 characters"],
      maxlength: [280, "Maximum length is 280 characters"],
    },
    content: {
      type: String,
      required: [true, `Content is required`],
      minlength: [3, "Minimum length is 3 characters"],
      maxlength: [2000, "Maximum length is 2000 characters"],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
    },
  },
  { timestamps: true }
);

const Article = model("Article", articleSchema);

export default Article;
