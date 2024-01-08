import { User } from "./user-entity";

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

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.createdAt = user.created_at;
    this.updatedAt = user.updated_at;
  }
}
