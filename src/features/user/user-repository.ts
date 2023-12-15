import User from "./user-schema";
import { ISignUpUserData, UserEntity } from "./user-types";

export async function findOneByUsername(username: string | undefined) {
  if (!username) return null;

  const existing = await User.findOne({
    username: username.toLowerCase(),
  });

  if (!existing) return null;

  return existing;
}

export async function findOneById(id: string) {
  const existing = await User.findById(id);
  if (!existing) return null;
  return existing;
}

export async function findOneByPassword(username: string | undefined, password: string | undefined) {
  if (!username || !password) return null;

  const existing = await User.findOne({
    username: username.toLowerCase(),
  });

  if (!existing) return null;

  const matching = await existing.comparePassword(password);

  if (!matching) return null;

  return existing;
}

export async function createUser(userData: ISignUpUserData) {
  const user = new User(userData);
  await user.save();
  return user;
}
