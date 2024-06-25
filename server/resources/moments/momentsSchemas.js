import Joi from "joi";

const id = Joi.number().integer().positive().required();
const name = Joi.string();
const image = Joi.string().allow(null);
const video = Joi.string().allow(null);
const date = Joi.date().allow(null);

export const idSchema = Joi.object({
  id: id,
});

export const addMomentSchema = Joi.object({
  name: name,
  image: image.optional(),
  video: video.optional(),
  date: date.optional(),
});

export const updateMomentSchema = Joi.object({
  id: id,
  name: name,
  image: image.optional(),
  video: video.optional(),
  date: date.optional(),
});
