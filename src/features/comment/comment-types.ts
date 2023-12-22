import { ObjectId, WithId } from "mongodb";
import { isValidObjectId } from "mongoose";
import { IUser, UserDto } from "../user/user-types";

export interface IComment {
  _id: ObjectId;
  content: string;
  owner: ObjectId | IUser;
  parent: ObjectId;
  article: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateCommentData = Pick<IComment, "content" | "parent" | "article">;

export type IPatchCommentData = Pick<IComment, "content">;

/**
 * Represents a Public Comment with limited information.
 */
export class CommentDto {
  id: string;
  content: string;
  owner: UserDto | string;
  parent: string;
  article: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(comment: WithId<IComment>) {
    this.id = comment._id.toString();
    this.content = comment.content;
    this.parent = comment.parent?.toString();
    this.article = comment.article.toString();
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;

    if (isValidObjectId(comment.owner)) {
      this.owner = (comment.owner as ObjectId).toString();
    } else {
      this.owner = new UserDto(comment.owner as IUser);
    }
  }
}
