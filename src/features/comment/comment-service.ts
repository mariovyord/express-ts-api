import { NotFoundError, UnauthorizedError } from "../../utils/app-error";
import { IFullQuery, parseQueryToMongoParams } from "../../utils/parse-query";
import * as commentQueries from "./comment-queries";
import { CommentDto, ICreateCommentData, IPatchCommentData } from "./comment-types";

export async function getAllComments(query: IFullQuery): Promise<CommentDto[] | number> {
  const parsedQuery = parseQueryToMongoParams(query);

  if (parsedQuery.count) {
    return commentQueries.countDocumentsByQuery(parsedQuery);
  }

  const comments = await commentQueries.findCommentsByQuery(parsedQuery);

  return comments.map((x) => new CommentDto(x));
}

export async function getOneComment(id: string, query: any): Promise<CommentDto | null> {
  let populate = "";
  let limitPopulate = "";

  if (query && query.populate) {
    populate += query.populate;

    if (query.populate.includes("owner")) {
      limitPopulate += "username firstName lastName";
    }
  }

  const comment = await commentQueries.findCommentById(id, { populate, limitPopulate });

  if (!comment) {
    throw new NotFoundError();
  }

  return new CommentDto(comment);
}

export async function createComment(data: ICreateCommentData): Promise<CommentDto> {
  const comment = await commentQueries.createComment(data);
  return new CommentDto(comment);
}

const ALLOWED_UPDATE_FIELDS = ["content"];

export async function updateComment(id: string, userId: string, data: IPatchCommentData): Promise<CommentDto> {
  const comment = await commentQueries.findCommentById(id);

  if (comment === null) throw new NotFoundError();
  if (comment.owner.toString() !== userId) throw new UnauthorizedError();

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in data) {
      comment[key] = data[key];
    }
  }

  await commentQueries.saveUpdatedComment(comment);

  return new CommentDto(comment);
}

export async function deleteComment(id: string, userId: string): Promise<void> {
  const comment = await commentQueries.findCommentById(id);

  if (!comment) throw new NotFoundError();
  if (comment.owner.toString() !== userId) throw new UnauthorizedError();

  await commentQueries.deleteCommentById(id);
}
