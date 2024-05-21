import Joi from "joi";

const email = Joi.string().email().required();
const password = Joi.string().min(8).required();

export const loginSchema = Joi.object({
  email: email,
  password: password,
});

export const registerSchema = Joi.object({
  email: email,
  password: password,
});
