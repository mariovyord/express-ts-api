import { ObjectId, WithId } from "mongodb";
import { isValidObjectId } from "mongoose";
import { IUser, UserDto } from "../user/user-types";
import { Comment } from "./comment-entity";

export type ICreateCommentData = { content: string; parent: string; article: string };

export type IPutCommentData = {
  content: string;
};

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

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.parent = comment.parent;
    this.article = comment.article;
    this.createdAt = comment.created_at;
    this.updatedAt = comment.updated_at;

    if (typeof comment.owner === "string") {
      this.owner = comment.owner;
    } else {
      this.owner = new UserDto(comment.owner);
    }
  }
}
