import { ObjectId } from "mongodb";
import { IUser, UserEntity } from "../user/user-types";

export interface IArticle {
  _id: ObjectId;
  title: string;
  content: string;
  owner: ObjectId | IUser;
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
  owner?: UserEntity;

  constructor(article: IArticle) {
    this.id = article._id.toString();
    this.title = article.title;
    this.content = article.content;

    if (article.owner && typeof article.owner === "object") {
      this.owner = new UserEntity(article.owner as IUser);
    }
  }
}
