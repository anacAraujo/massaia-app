import Joi from "joi";

const id = Joi.number().integer().positive().required();
const email = Joi.string().email().required();
const password = Joi.string().min(8).required();

export const idSchema = Joi.object({
  id: id,
});

export const updateUserSchema = Joi.object({
  id: id,
  email: email,
  password: password,
});
