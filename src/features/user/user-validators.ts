import Joi from "joi";
import { ISignUpUserData } from "./user-types";

export const userSignInSchema = Joi.object().keys({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

export const userPasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().min(3).max(30).trim().required(),
  newPassword: Joi.string().min(3).max(30).trim().required(),
});

export const userUpdateSchema = Joi.object()
  .keys({
    firstName: Joi.string().alphanum().trim(),
    lastName: Joi.string().alphanum().trim(),
  })
  .min(1);

export const userSignUpSchema = Joi.object<ISignUpUserData>().keys({
  username: Joi.string().min(3).max(30).alphanum().trim().required(),
  password: Joi.string().min(3).max(30).trim().required(),
  firstName: Joi.string().alphanum().trim().required(),
  lastName: Joi.string().alphanum().trim().required(),
});
