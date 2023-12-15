import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface SignUpUserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Represents a Public User with limited information.
 */
export class UserEntity {
  id: string;
  username: string;
  firstName: string;
  lastName: string;

  constructor(user: IUser) {
    this.id = user._id.toString();
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
