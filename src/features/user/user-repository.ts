import { AppDataSource } from "../../config/db";
import { User } from "./user-entity";

export const getUserRepository = () => AppDataSource.getRepository(User);
