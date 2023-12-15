import jwt from "jsonwebtoken";
import getConfig from "../../config/get-config";
import { SignUpUserData, UserEntity } from "./user-types";
import * as userRepository from "./user-repository";

export async function signUp(
  userData: SignUpUserData
): Promise<[string, UserEntity]> {
  const existing = await userRepository.findOneByUsername(userData.username);

  if (existing) {
    throw new Error("Username already exists");
  }

  const user = await userRepository.createUser(userData);
  const token = await createToken(user.id);

  return [token, user];
}

export async function signIn(
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
  const config = getConfig();

  if (!config.JWT_SECRET) {
    throw new Error("Internal server error");
  }

  return jwt.sign({ id }, `${config.JWT_SECRET}`, {
    expiresIn: "7d",
  });
}
