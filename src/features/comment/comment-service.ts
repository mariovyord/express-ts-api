import { NotFoundError, UnauthorizedError } from "../../utils/app-error";
import { IFullQuery, buildQuery } from "../../utils/build-query";
import { Comment } from "./comment-entity";
import { commentRepository } from "./comment-repository";
import { CommentDto, ICreateCommentData, IPutCommentData } from "./comment-types";

export async function getAllComments(query: IFullQuery): Promise<CommentDto[] | number> {
  const comments = await buildQuery(commentRepository(), query);

  if (!comments) {
    return [];
  }

  return comments.map((x) => new CommentDto(x));
}

export async function getOneComment(id: string, query: any): Promise<CommentDto | null> {
  let queryBuilder = commentRepository().createQueryBuilder("entity");

  queryBuilder = queryBuilder.where("entity.id = :id", { id });

  if (query && query.populate) {
    queryBuilder = queryBuilder.leftJoinAndSelect(`entity.${query.populate}`, query.populate);
  }

  const comment = await queryBuilder.getOne();

  if (!comment) {
    throw new NotFoundError();
  }

  return new CommentDto(comment);
}

export async function createComment(data: ICreateCommentData & { owner: string }): Promise<CommentDto> {
  const comment = new Comment();
  comment.article = data.article;
  comment.parent = data.parent;
  comment.content = data.content;
  comment.created_at = new Date();
  comment.updated_at = new Date();
  comment.owner = data.owner;

  await commentRepository().save(comment);

  return new CommentDto(comment);
}

const ALLOWED_UPDATE_FIELDS = ["content"];

export async function updateComment(id: string, userId: string, data: IPutCommentData): Promise<CommentDto> {
  const comment = await commentRepository().findOneBy({ id });

  if (comment === null) throw new NotFoundError();
  if (comment.owner !== userId) throw new UnauthorizedError();

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in data) {
      comment[key] = data[key];
    }
  }

  comment.updated_at = new Date();

  await commentRepository().save(comment);

  return new CommentDto(comment);
}

export async function deleteComment(id: string, userId: string): Promise<void> {
  const comment = await commentRepository().findOneBy({ id });

  if (!comment) throw new NotFoundError();
  if (comment.owner !== userId) throw new UnauthorizedError();

  await commentRepository().remove(comment);
}
