import { IUser } from "../types/common";

/**
 * Represents a Public User with limited information.
 */
class PublicUser {
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

export default PublicUser;
