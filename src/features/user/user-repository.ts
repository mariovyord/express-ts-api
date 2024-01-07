import { AppDataSource } from "../../config/db";
import { User } from "./user-entity";

export const userRepository = () => AppDataSource.getRepository(User);
