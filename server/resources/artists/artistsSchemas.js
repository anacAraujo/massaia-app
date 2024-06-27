import Joi from "joi";

const id = Joi.number().integer().positive().required();
const name = Joi.string().required();
const image = Joi.string().allow(null);
const title = Joi.string().required();

export const idSchema = Joi.object({
  id: id,
});

export const addArtistSchema = Joi.object({
  name: name,
  image: image.optional(),
  title: title,
});

export const updateArtistSchema = Joi.object({
  id: id,
  name: name,
  image: image.optional(),
  title: title,
})
