import User from "./user-schema";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import config from "../../config/config";

interface SignUpUserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

async function signUp(userData: SignUpUserData) {
  const existing = await User.findOne({
    username: userData.username?.toLowerCase(),
  });

  if (existing) {
    throw new Error("Username already exists");
  }

  const user = new User(userData);
  await user.save();

  const token = await createToken(user._id);

  return {
    token,
    user,
  };
}

async function signIn(username: string, password: string) {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  const match = await user.comparePassword(password);

  if (!match) {
    throw new Error("Incorrect username or password");
  }

  const token = await createToken(user._id);

  return {
    token,
    user,
  };
}

async function createToken(id: ObjectId) {
  return jwt.sign({ id: id.toString() }, `${config.JWT_SECRET}`, {
    expiresIn: "7d",
  });
}

export default {
  signIn,
  signUp,
};
