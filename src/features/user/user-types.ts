import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserLocal {
  id: string;
}

export interface ISignUpUserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUpdateUserData {
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Represents a Public User with limited information.
 */
export class UserDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user._id.toString();
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
