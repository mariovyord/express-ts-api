import jwt from "jsonwebtoken";
import getConfig from "../../config/get-config";
import { IUserLocal, ISignUpUserData, UserDto, IUpdateUserData } from "./user-types";
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "../../utils/app-error";
import { User } from "./user-entity";
import { getUserRepository } from "./user-repository";

export async function signUp(userData: ISignUpUserData): Promise<[string, UserDto]> {
  if (!userData.username) {
    throw new BadRequestError();
  }

  const existing = await getUserRepository().findOneBy({
    username: userData.username.toLowerCase(),
  });

  if (existing) {
    throw new BadRequestError("Username already exists");
  }

  const user = new User();
  user.username = userData.username;
  user.first_name = userData.firstName;
  user.last_name = userData.lastName;
  user.setPassword(userData.password);
  user.created_at = new Date();
  user.updated_at = new Date();

  await getUserRepository().save(user);

  const token = await createToken(user.id);

  return [token, new UserDto(user)];
}

export async function signIn(username: string, password: string): Promise<[string, UserDto]> {
  if (!username || !password) {
    throw new BadRequestError();
  }

  const user = await getUserRepository().findOneBy({
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new UnauthorizedError();
  }

  const matchingPassword = await user.comparePassword(password);

  if (!matchingPassword) {
    throw new UnauthorizedError("Incorrect username or password");
  }

  const token = await createToken(user.id);

  return [token, new UserDto(user)];
}

async function createToken(id: string) {
  const config = getConfig();

  if (!config.JWT_SECRET) {
    throw new InternalServerError();
  }

  return jwt.sign({ id }, `${config.JWT_SECRET}`, {
    expiresIn: "7d",
  });
}

export async function getUser(userData: IUserLocal): Promise<UserDto> {
  const user = await getUserRepository().findOneBy({ id: userData.id });
  if (!user) {
    throw new NotFoundError();
  }

  return new UserDto(user);
}

const ALLOWED_UPDATE_FIELDS = ["firstName", "lastName"];

export async function updateUser(userId: string, userData: Partial<IUpdateUserData>): Promise<UserDto> {
  const user = await getUserRepository().findOneBy({ id: userId });

  if (!user || user.id !== userId) {
    throw new UnauthorizedError();
  }

  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (key in userData) {
      user[key] = userData[key];
    }
  }

  user.updated_at = new Date();

  await getUserRepository().save(user);

  return new UserDto(user);
}

export async function updatePassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await getUserRepository().findOneBy({ id: userId });

  if (!user) {
    throw new NotFoundError();
  }

  const match = await user.comparePassword(oldPassword);

  if (!match) {
    throw new UnauthorizedError();
  }

  user.setPassword(newPassword);

  user.updated_at = new Date();

  await getUserRepository().save(user);

  return user;
}
