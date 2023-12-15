import { IFullQuery, parseQueryToMongoParams } from "../../utils/parse-query";
import * as articleRepository from "./article-repository";
import { ArticleEntity, ICreateArticleData, IPatchArticleData } from "./article-types";

export async function getAll(query: IFullQuery): Promise<ArticleEntity[] | number> {
  const parsedQuery = parseQueryToMongoParams(query);

  if (parsedQuery.count) {
    return articleRepository.countDocumentsByQuery(parsedQuery);
  }

  const articles = await articleRepository.findArticlesByQuery(parsedQuery);

  return articles.map((x) => new ArticleEntity(x));
}

export async function getOne(id: string, query: any): Promise<ArticleEntity | null> {
  let populate = "";
  let limitPopulate = "";

  if (query && query.populate) {
    populate += query.populate;

    if (query.populate.includes("owner")) {
      limitPopulate += "username firstName lastName";
    }
  }

  const article = await articleRepository.findArticleById(id, { populate, limitPopulate });

  if (!article) {
    throw new Error("Not found");
  }

  return new ArticleEntity(article);
}

export async function create(data: ICreateArticleData): Promise<ArticleEntity> {
  const article = await articleRepository.createArticle(data);
  return new ArticleEntity(article);
}

const ALLOWED_UPDATE_FIELDS = ["title", "content"];

export async function update(id: string, userId: string, data: IPatchArticleData): Promise<ArticleEntity> {
  const article = await articleRepository.findArticleById(id);

  if (article === null) throw new Error("Article not found");
  if (article.owner.toString() !== userId) throw new Error("Only owners can update article");

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in data) {
      article[key] = data[key];
    }
  }

  await article.save();

  return new ArticleEntity(article);
}

export async function remove(id: string, userId: string): Promise<void> {
  const article = await articleRepository.findArticleById(id);

  if (!article) throw new Error("Article does not exist");
  if (article.owner.toString() !== userId) throw new Error("Only owners can delete articles");

  await articleRepository.deleteArticleById(id);
}
