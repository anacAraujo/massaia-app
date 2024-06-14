import Joi from "joi";

const validTlds = ["com", "pt", "org", "gov"];

const email = Joi.string()
  .email({
    tlds: { allow: validTlds },
  })
  .required();
const password = Joi.string().min(8).required();
const confirmPassword = Joi.any()
  .equal(Joi.ref("password"))
  .required()
  .messages({ "any.only": "Passwords do not match" });

export const loginSchema = Joi.object({
  email: email,
  password: password,
});

export const registerSchema = Joi.object({
  email: email,
  password: password,
  confirmPassword: confirmPassword,
});
