import { IParsedQuery } from "../../utils/parse-query";
import Comment from "./comment-schema";
import { ICreateCommentData } from "./comment-types";

export async function findCommentsByQuery(parsedQuery: IParsedQuery) {
  const comments = await Comment.find(parsedQuery.find)
    .sort(parsedQuery.sort)
    .limit(parsedQuery.pagination.limit)
    .skip(parsedQuery.pagination.skip)
    .populate(parsedQuery.populate, parsedQuery.limitPopulate)
    .select(parsedQuery.select);

  if (!comments) {
    return [];
  }

  return comments;
}

export async function countDocumentsByQuery(parsedQuery: IParsedQuery) {
  if (parsedQuery.find) {
    return Comment.find(parsedQuery.find).countDocuments();
  }

  return Comment.find().estimatedDocumentCount();
}

export async function findCommentById(id: string, populateField = { populate: "", limitPopulate: "" }) {
  const comments = await Comment.findById(id).populate(populateField.populate, populateField.limitPopulate);

  if (!comments) {
    return null;
  }

  return comments;
}

export async function createComment(data: ICreateCommentData) {
  const result = new Comment(data);
  await result.save();

  return result;
}

export async function deleteCommentById(id: string) {
  await Comment.findOneAndDelete({ _id: id });
}
