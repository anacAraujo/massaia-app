import Joi from "joi";

const id = Joi.number().integer().positive().required();
const name = Joi.string().required();

export const idSchema = Joi.object({
    id: id.required(),
  });

export const addRoleSchema = Joi.object({
    name: name
});