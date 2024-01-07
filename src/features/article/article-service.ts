import { NotFoundError, UnauthorizedError } from "../../utils/app-error";
import { IFullQuery, parseQueryToMongoParams } from "../../utils/parse-query";
import * as articleQueries from "./article-queries";
import { ArticleDto, ICreateArticleData, IPatchArticleData } from "./article-types";

export async function getAll(query: IFullQuery): Promise<ArticleDto[] | number> {
  const parsedQuery = parseQueryToMongoParams(query);

  if (parsedQuery.count) {
    return articleQueries.countDocumentsByQuery(parsedQuery);
  }

  const articles = await articleQueries.findArticlesByQuery(parsedQuery);

  return articles.map((x) => new ArticleDto(x));
}

export async function getOne(id: string, query: any): Promise<ArticleDto | null> {
  let populate = "";
  let limitPopulate = "";

  if (query && query.populate) {
    populate += query.populate;

    if (query.populate.includes("owner")) {
      limitPopulate += "username firstName lastName";
    }
  }

  const article = await articleQueries.findArticleById(id, { populate, limitPopulate });

  if (!article) {
    throw new NotFoundError();
  }

  return new ArticleDto(article);
}

export async function create(data: ICreateArticleData): Promise<ArticleDto> {
  const article = await articleQueries.createArticle(data);
  return new ArticleDto(article);
}

const ALLOWED_UPDATE_FIELDS = ["title", "content"];

export async function update(id: string, userId: string, data: IPatchArticleData): Promise<ArticleDto> {
  const article = await articleQueries.findArticleById(id);

  if (article === null) throw new NotFoundError();
  if (article.owner.toString() !== userId) throw new UnauthorizedError();

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in data) {
      article[key] = data[key];
    }
  }

  await articleQueries.saveUpdatedArticle(article);

  return new ArticleDto(article);
}

export async function remove(id: string, userId: string): Promise<void> {
  const article = await articleQueries.findArticleById(id);

  if (!article) throw new NotFoundError();
  if (article.owner.toString() !== userId) throw new UnauthorizedError();

  await articleQueries.deleteArticleById(id);
}
