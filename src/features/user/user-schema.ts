import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user-types";
// import beautifyUnique from "mongoose-beautiful-unique-validation";

Schema.Types.String.set("trim", true);

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// userSchema.plugin(beautifyUnique);

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", function (next) {
  this.username = this.username.toLowerCase();
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (!noBlacklistedChars(this.password))
      throw new Error(
        "Password should not contain whitespace or special symbols"
      );

    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

function noBlacklistedChars(params: string) {
  return /\W/.test(params) === false;
}
const User = model("User", userSchema);

export default User;
