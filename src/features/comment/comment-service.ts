import { IFullQuery, parseQueryToMongoParams } from "../../utils/parse-query";
import * as commentRepository from "./comment-repository";
import { CommentEntity, ICreateCommentData, IPatchCommentData } from "./comment-types";

export async function getAllComments(query: IFullQuery): Promise<CommentEntity[] | number> {
  const parsedQuery = parseQueryToMongoParams(query);

  if (parsedQuery.count) {
    return commentRepository.countDocumentsByQuery(parsedQuery);
  }

  const comments = await commentRepository.findCommentsByQuery(parsedQuery);

  return comments.map((x) => new CommentEntity(x));
}

export async function getOneComment(id: string, query: any): Promise<CommentEntity | null> {
  let populate = "";
  let limitPopulate = "";

  if (query && query.populate) {
    populate += query.populate;

    if (query.populate.includes("owner")) {
      limitPopulate += "username firstName lastName";
    }
  }

  const comment = await commentRepository.findCommentById(id, { populate, limitPopulate });

  if (!comment) {
    throw new Error("Not found");
  }

  return new CommentEntity(comment);
}

export async function createComment(data: ICreateCommentData): Promise<CommentEntity> {
  const comment = await commentRepository.createComment(data);
  return new CommentEntity(comment);
}

const ALLOWED_UPDATE_FIELDS = ["content"];

export async function updateComment(id: string, userId: string, data: IPatchCommentData): Promise<CommentEntity> {
  const comment = await commentRepository.findCommentById(id);

  if (comment === null) throw new Error("Comment not found");
  if (comment.owner.toString() !== userId) throw new Error("Only owners can update commet");

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in data) {
      comment[key] = data[key];
    }
  }

  await comment.save();

  return new CommentEntity(comment);
}

export async function deleteComment(id: string, userId: string): Promise<void> {
  const comment = await commentRepository.findCommentById(id);

  if (!comment) throw new Error("Comment does not exist");
  if (comment.owner.toString() !== userId) throw new Error("Only owners can delete comments");

  await commentRepository.deleteCommentById(id);
}
