import Joi from "joi";

const id = Joi.number().integer().positive().required();
const name = Joi.string().required();
const cover = Joi.string();
const date = Joi.date();

export const idSchema = Joi.object({
  id: id,
});

export const updateAlbumSchema = Joi.object({
  id: id,
  name: name,
  cover: cover,
  date: date,
});
