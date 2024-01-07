import { NotFoundError, UnauthorizedError } from "../../utils/app-error";
import { IFullQuery, buildQuery } from "../../utils/build-query";
import { Article } from "./article-entity";
import { articleRepository } from "./article-repository";
import { ArticleDto, ICreateArticleData, IPutArticleData } from "./article-types";

export async function getAll(query: IFullQuery): Promise<ArticleDto[]> {
  const articles = await buildQuery(articleRepository(), query);

  if (!articles) {
    return [];
  }

  return articles.map((x) => new ArticleDto(x));
}

export async function getOne(id: string, query: any): Promise<ArticleDto> {
  let queryBuilder = articleRepository().createQueryBuilder("entity");

  queryBuilder = queryBuilder.where("entity.id = :id", { id });

  if (query && query.populate) {
    queryBuilder = queryBuilder.leftJoinAndSelect(`entity.${query.populate}`, query.populate);
  }

  const article = await queryBuilder.getOne();

  if (!article) {
    throw new NotFoundError();
  }

  return new ArticleDto(article);
}

export async function create(data: ICreateArticleData & { owner: string }): Promise<ArticleDto> {
  const article = new Article();
  article.content = data.content;
  article.title = data.title;
  article.owner = data.owner;
  article.created_at = new Date();
  article.updated_at = new Date();

  await articleRepository().save(article);

  return new ArticleDto(article);
}

const ALLOWED_UPDATE_FIELDS = ["title", "content"];

export async function update(id: string, userId: string, data: IPutArticleData): Promise<ArticleDto> {
  const article = await articleRepository().findOneBy({ id });

  if (article === null) throw new NotFoundError();
  if (article.owner.toString() !== userId) throw new UnauthorizedError();

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in data) {
      article[key] = data[key];
    }
  }

  article.updated_at = new Date();

  await articleRepository().save(article);

  return new ArticleDto(article);
}

export async function remove(id: string, userId: string): Promise<void> {
  const article = await articleRepository().findOneBy({ id });

  if (!article) throw new NotFoundError();
  if (article.owner !== userId) throw new UnauthorizedError();

  await articleRepository().remove(article);
}
