import Joi from "joi";

const id = Joi.number().integer().positive().required();
const song_id = Joi.number().integer().positive().required();
const author_id = Joi.number().integer().positive().required();
const image = Joi.string();
const date = Joi.date().allow(null);

export const idSchema = Joi.object({
  id: id.required(),
});

export const songIddSchema = Joi.object({
  song_id: song_id.optional(),
});

export const addArtPieceSchema = Joi.object({
  song_id: song_id,
  author_id: author_id,
  image: image,
  date: date.optional(),
});

export const updateArtPieceSchema = Joi.object({
  id: id,
  song_id: song_id,
  author_id: author_id,
  image: image,
  date: date.optional(),
});
