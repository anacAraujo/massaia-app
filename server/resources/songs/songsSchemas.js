import Joi from "joi";

const id = Joi.number().integer().positive();

export const idSchema = Joi.object({
  id: id.optional(),
});

export const albumIddSchema = Joi.object({
  album_id: id.optional(),
});
