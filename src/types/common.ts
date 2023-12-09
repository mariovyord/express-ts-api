import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  comparePassword: (password: string) => boolean;
}

export interface IArticle {
  _id: ObjectId;
  title: string;
  content: string;
  owner: ObjectId;
}
