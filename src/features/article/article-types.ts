import { ObjectId } from "mongodb";

export interface IArticle {
  _id: ObjectId;
  title: string;
  content: string;
  owner: ObjectId;
}
