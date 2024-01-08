import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";
import { Article } from "../features/article/article-entity";
import { Comment } from "../features/comment/comment-entity";
import { User } from "../features/user/user-entity";
import { getConfig } from "./get-config";

const config = getConfig();

export const getDbConfig = (): DataSourceOptions => ({
  type: "postgres",
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: config.NODE_ENV === "production" ? false : true,
  logging: !!config.LOGGING,
  entities: [Article, Comment, User],
});

export const AppDataSource = new DataSource(getDbConfig());
