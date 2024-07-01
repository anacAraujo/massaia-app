import Joi from "joi";

const id = Joi.number().integer().positive().required();
const topic = Joi.string().required();
const text = Joi.string().required();

export const idSchema = Joi.object({
  id: id,
});

export const addContentSchema = Joi.object({
  topic: topic,
  text: text,
});

export const updateContentSchema = Joi.object({
  id: id,
  topic: topic,
  text: text,
});
