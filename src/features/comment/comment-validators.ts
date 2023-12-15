import Joi from "joi";
import { ICreateCommentData, IPatchCommentData } from "./comment-types";

export const commentCreateSchema = Joi.object<ICreateCommentData>().keys({
  content: Joi.string().required().min(3).max(600).trim(),
  parent: Joi.string().optional().trim(),
  article: Joi.string().required().trim(),
});

export const commentPatchSchema = Joi.object<IPatchCommentData>().keys({
  content: Joi.string().required().min(3).max(600).trim(),
});
