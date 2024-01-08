import { DataSource, DataSourceOptions } from "typeorm";
import { Article } from "../src/features/article/article-entity";
import { Comment } from "../src/features/comment/comment-entity";
import { User } from "../src/features/user/user-entity";
import { createDatabase } from "typeorm-extension";
import { AppDataSource } from "../src/config/db";
import { getConfig } from "../src/config/get-config";

export async function initTestDataSource(): Promise<DataSource> {
  const config = getConfig();

  const options: DataSourceOptions = {
    type: "postgres",
    host: config.DB_HOST,
    port: 5000,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: config.NODE_ENV === "production" ? false : true,
    logging: true,
    entities: [Article, Comment, User],
  };

  await createDatabase({
    options,
    ifNotExist: true,
  });

  return AppDataSource.initialize();
}
