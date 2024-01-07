import Joi from "joi";
import { ICreateArticleData, IPutArticleData } from "./article-types";

export const articleCreateSchema = Joi.object<ICreateArticleData>().keys({
  title: Joi.string().required().min(3).max(100),
  content: Joi.string().required().min(3).max(10000),
});

export const articlePatchSchema = Joi.object<IPutArticleData>().keys({
  title: Joi.string().optional().min(3).max(100),
  content: Joi.string().optional().min(3).max(10000),
});
