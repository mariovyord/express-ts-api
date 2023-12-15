import jwt from "jsonwebtoken";
import getConfig from "../../config/get-config";
import { IUserLocal, ISignUpUserData, UserEntity, IUpdateUserData } from "./user-types";
import * as userRepository from "./user-repository";

export async function signUp(userData: ISignUpUserData): Promise<[string, UserEntity]> {
  const existing = await userRepository.findOneByUsername(userData.username);

  if (existing) {
    throw new Error("Username already exists");
  }

  const user = await userRepository.createUser(userData);
  const token = await createToken(user.id);

  return [token, new UserEntity(user)];
}

export async function signIn(username: string, password: string): Promise<[string, UserEntity]> {
  const user = await userRepository.findOneByPassword(username, password);

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  const token = await createToken(user.id);

  return [token, new UserEntity(user)];
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

export async function getUser(userData: IUserLocal): Promise<UserEntity> {
  const user = await userRepository.findOneById(userData.id);

  if (!user) {
    throw new Error("Not found");
  }

  return new UserEntity(user);
}

const ALLOWED_UPDATE_FIELDS = ["firstName", "lastName"];

export async function updateUser(userId: string, userData: Partial<IUpdateUserData>): Promise<UserEntity> {
  const user = await userRepository.findOneById(userId);

  if (user === null || user._id.toString() !== userId) {
    throw new Error("Failed to update user");
  }

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in userData) {
      user[key] = userData[key];
    }
  }

  // mongoose will auto-update updatedAt field
  await user.save();

  return new UserEntity(user);
}

export async function updatePassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await userRepository.findOneById(userId);

  if (!user) {
    throw new Error("User does not exist");
  }

  const match = await user.comparePassword(oldPassword);

  if (!match) {
    throw new Error("Incorrect password");
  }

  user.password = newPassword;

  await user.save();

  return user;
}
