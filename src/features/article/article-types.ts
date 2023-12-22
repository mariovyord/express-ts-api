import { ObjectId } from "mongodb";
import { IUser, UserDto } from "../user/user-types";
import { isValidObjectId } from "mongoose";

export interface IArticle {
  _id: ObjectId;
  title: string;
  content: string;
  owner: ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
  estimatedDocumentCount: () => number;
  count: () => number;
}

export type ICreateArticleData = Pick<IArticle, "title" | "content">;

export type IPatchArticleData = Pick<IArticle, "title" | "content">;

/**
 * Represents a Public Article with limited information.
 */
export class ArticleDto {
  id: string;
  title: string;
  content: string;
  owner: UserDto | string;
  createdAt: Date;
  updatedAt: Date;

  constructor(article: IArticle) {
    this.id = article._id.toString();
    this.title = article.title;
    this.content = article.content;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;

    if (isValidObjectId(article.owner)) {
      this.owner = (article.owner as ObjectId).toString();
    } else {
      this.owner = new UserDto(article.owner as IUser);
    }
  }
}
