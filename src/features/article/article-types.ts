import { ObjectId } from "mongodb";
import { IUser, UserEntity } from "../user/user-types";

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
export class ArticleEntity {
  id: string;
  title: string;
  content: string;
  owner: UserEntity | string;
  createdAt: Date;
  updatedAt: Date;

  constructor(article: IArticle) {
    this.id = article._id.toString();
    this.title = article.title;
    this.content = article.content;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;

    if (article.owner && typeof article.owner === "object") {
      this.owner = new UserEntity(article.owner as IUser);
    } else {
      this.owner = (article.owner as ObjectId).toString();
    }
  }
}

export interface GetAllArticlesQuery {
  where?: string | string[];
  sortBy?: string | string[];
  page?: string;
  pageSize?: string;
  populate?: string | string[];
  select?: string | string[];
  count?: string;
}
