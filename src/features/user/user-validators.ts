import Joi from "joi";
import { SignUpUserData } from "./user-types";

export const userSignInSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const userSignUpSchema = Joi.object<SignUpUserData>().keys({
  username: Joi.string().min(3).max(30).alphanum().required(),
  password: Joi.string().min(3).max(30).required(),
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
});
