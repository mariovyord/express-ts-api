import { AppDataSource } from "../../config/db";
import { Comment } from "./comment-entity";

export const commentRepository = () => AppDataSource.getRepository(Comment);
