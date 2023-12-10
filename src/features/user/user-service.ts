import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import config from "../../config/config";
import { SignUpUserData, UserEntity } from "./user-types";
import * as userRepository from "./user-repository";

async function signUp(userData: SignUpUserData): Promise<[string, UserEntity]> {
  const existing = await userRepository.findOneByUsername(userData.username);

  if (existing) {
    throw new Error("Username already exists");
  }

  const user = await userRepository.createUser(userData);
  const token = await createToken(user.id);

  return [token, user];
}

async function signIn(
  username: string,
  password: string
): Promise<[string, UserEntity]> {
  const user = await userRepository.findOneByPassword(username, password);

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  const token = await createToken(user.id);

  return [token, user];
}

async function createToken(id: string) {
  return jwt.sign({ id }, `${config.JWT_SECRET}`, {
    expiresIn: "7d",
  });
}

export default {
  signIn,
  signUp,
};
