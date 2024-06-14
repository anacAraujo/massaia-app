import Joi from "joi";

const id = Joi.number().integer().positive().required();
const email = Joi.string().email().required();
const password = Joi.string().min(8).required();
const newPassword = Joi.string().min(8).required();
const confirmNewPassword = Joi.any()
  .equal(Joi.ref("newPassword"))
  .required()
  .messages({ "any.only": "Passwords do not match" });

export const idSchema = Joi.object({
  id: id,
});

export const updateUserSchema = Joi.object({
  id: id,
  email: email,
  password: password,
  newPassword: newPassword,
  confirmNewPassword: confirmNewPassword,
});
