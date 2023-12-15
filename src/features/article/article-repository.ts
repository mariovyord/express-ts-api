import Article from "./article-schema";
import { ICreateArticleData } from "./article-types";
import { IParsedQuery } from "./article-utils";

export async function findArticlesByQuery(parsedQuery: IParsedQuery) {
  const articles = await Article.find(parsedQuery.find)
    .sort(parsedQuery.sort)
    .limit(parsedQuery.pagination.limit)
    .skip(parsedQuery.pagination.skip)
    .populate(parsedQuery.populate, parsedQuery.limitPopulate)
    .select(parsedQuery.select);

  if (!articles) {
    return [];
  }

  return articles;
}

export async function countDocumentsByQuery(parsedQuery: IParsedQuery) {
  if (parsedQuery.find) {
    return Article.find(parsedQuery.find).countDocuments();
  }

  return Article.find().estimatedDocumentCount();
}

export async function findArticleById(id: string, populateField = { populate: "", limitPopulate: "" }) {
  const article = await Article.findById(id).populate(populateField.populate, populateField.limitPopulate);

  if (!article) {
    return null;
  }

  return article;
}

export async function createArticle(data: ICreateArticleData) {
  const result = new Article(data);
  await result.save();

  return result;
}

export async function deleteArticleById(id: string) {
  await Article.findOneAndDelete({ _id: id });
}
