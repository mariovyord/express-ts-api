import { AppDataSource } from "../../config/db";
import { Article } from "./article-entity";

export const articleRepository = () => AppDataSource.getRepository(Article);
