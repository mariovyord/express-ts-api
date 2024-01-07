import { DataSource } from "typeorm";
import "reflect-metadata";
import { Article } from "../features/article/article-entity";
import { Comment } from "../features/comment/comment-entity";
import { User } from "../features/user/user-entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6543,
  password: "123123",
  username: "postgres",
  database: "express_app",
  synchronize: true,
  logging: true,
  entities: [Article, Comment, User],
});
