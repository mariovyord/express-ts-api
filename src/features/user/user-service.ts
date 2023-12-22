import jwt from "jsonwebtoken";
import getConfig from "../../config/get-config";
import { IUserLocal, ISignUpUserData, UserDto, IUpdateUserData } from "./user-types";
import * as userQueries from "./user-queries";

export async function signUp(userData: ISignUpUserData): Promise<[string, UserDto]> {
  const existing = await userQueries.findOneByUsername(userData.username);

  if (existing) {
    throw new Error("Username already exists");
  }

  const user = await userQueries.createUser(userData);
  const token = await createToken(user.id);

  return [token, new UserDto(user)];
}

export async function signIn(username: string, password: string): Promise<[string, UserDto]> {
  const user = await userQueries.findOneByPassword(username, password);

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  const token = await createToken(user.id);

  return [token, new UserDto(user)];
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

export async function getUser(userData: IUserLocal): Promise<UserDto> {
  const user = await userQueries.findOneById(userData.id);

  if (!user) {
    throw new Error("Not found");
  }

  return new UserDto(user);
}

const ALLOWED_UPDATE_FIELDS = ["firstName", "lastName"];

export async function updateUser(userId: string, userData: Partial<IUpdateUserData>): Promise<UserDto> {
  const user = await userQueries.findOneById(userId);

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

  return new UserDto(user);
}

export async function updatePassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await userQueries.findOneById(userId);

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
