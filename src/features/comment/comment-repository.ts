import { AppDataSource } from "../../config/db";
import { Comment } from "./comment-entity";

export const getCommentRepository = () => AppDataSource.getRepository(Comment);
