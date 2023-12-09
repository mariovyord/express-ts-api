import Joi from "joi";

export const userSignInSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const userSignUpSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).alphanum().required(),
  password: Joi.string().min(3).max(30).required(),
  firstName: Joi.string().alphanum().required(),
  lastname: Joi.string().alphanum().required(),
});
