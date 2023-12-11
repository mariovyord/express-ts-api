import * as articleRepository from "./article-repository";
import {
  ArticleEntity,
  ICreateArticleData,
  IPatchArticleData,
} from "./article-types";

export async function getAll(query: any): Promise<ArticleEntity[]> {
  const parsedQuery = {};

  // Pagination
  const pagination = {
    limit: 10,
    skip: 0,
  };

  if (query.page && query.pageSize) {
    let limit = parseInt(query.pageSize);
    if (limit > 30) limit = 30;
    pagination.limit = limit;
    pagination.skip = Math.max(0, parseInt(query.page) - 1) * pagination.limit;
  }

  // Populate properties
  let populate = "";
  let limitPopulate = "";

  if (Array.isArray(query.populate)) {
    populate += query.populate.join(" ");
  } else if (typeof query.populate === "string") {
    populate += query.populate;
  }

  if (query.populate && query.populate.includes("owner")) {
    limitPopulate += "username firstName lastName";
  }

  return articleRepository.findArticlesByQuery(parsedQuery);
}

export async function getOne(
  id: string,
  query: any
): Promise<ArticleEntity | null> {
  let populate = "";
  let limitPopulate = "";

  if (query.populate) {
    populate += query.populate;

    if (query.populate.includes("owner")) {
      limitPopulate += "username firstName lastName";
    }
  }

  return articleRepository.findArticleById(id);
}

export async function create(data: ICreateArticleData): Promise<ArticleEntity> {
  return articleRepository.createArticle(data);
}

export async function update(
  id: string,
  userId: string,
  data: IPatchArticleData
): Promise<ArticleEntity> {
  return articleRepository.findAndUpdateArticleById(id, userId, data);
}

export async function remove(id: string, userId: string): Promise<void> {
  const item = await articleRepository.findArticleById(id);

  if (!item) throw new Error("Article does not exist");
  if (item.ownerId !== userId) throw new Error("Only owners can delete items");

  await articleRepository.deleteArticleById(id);
}
