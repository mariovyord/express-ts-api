import { AppDataSource } from "../../config/db";
import { Article } from "./article-entity";

export const getArticleRepository = () => AppDataSource.getRepository(Article);
