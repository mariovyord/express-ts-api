import { UserDto } from "../user/user-types";
import { Article } from "./article-entity";

export type ICreateArticleData = {
  title: string;
  content: string;
};

export type IPutArticleData = {
  title: string;
  content: string;
};

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

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.createdAt = article.created_at;
    this.updatedAt = article.updated_at;

    if (typeof article.owner === "string") {
      this.owner = article.owner;
    } else {
      this.owner = new UserDto(article.owner);
    }
  }
}
