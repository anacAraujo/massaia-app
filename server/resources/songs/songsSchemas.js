import Joi from "joi";

const id = Joi.number().integer().positive().required();

export const idSchema = Joi.object({
  id: id,
});
