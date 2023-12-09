import Article from "../database/models/article.model";

export const getAll = async (query: any) => {
  const options = {};
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

  return Article.find(options)
    .limit(pagination.limit)
    .skip(pagination.skip)
    .populate(populate, limitPopulate);
};

export const getOne = async (id: string, query: any) => {
  let populate = "";
  let limitPopulate = "";

  if (query.populate) {
    populate += query.populate;

    if (query.populate.includes("owner")) {
      limitPopulate += "username firstName lastName";
    }
  }

  return Article.findById(id).populate(populate, limitPopulate);
};

export const create = async (data: any) => {
  const result = new Article(data);
  await result.save();
  return result;
};

export const update = async (id: string, userId: string, data: any) => {
  const article = await Article.findById(id);

  if (article === null) throw new Error();
  if (article.owner.toString() !== userId)
    throw new Error("Only owners can update article");

  for (const key of Object.keys(data)) {
    //@ts-ignore
    article[key] = data[key];
  }

  await article.save();

  return article;
};

export const remove = async (id: string, userId: string) => {
  const item = await Article.findById(id);
  if (!item) throw new Error("Article does not exist");

  if (item.owner.toString() !== userId)
    throw new Error("Only owners can delete items");

  await Article.findOneAndDelete({ _id: id });
};
