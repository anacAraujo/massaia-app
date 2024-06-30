import Joi from "joi";

const id = Joi.number().integer().positive().required();
const album_id = Joi.number().integer().positive().required();
const name = Joi.string().required();
const position = Joi.number().integer().positive().required();
const lyrics = Joi.string().allow(null);
const audio = Joi.string().required();
const video = Joi.string().allow(null);
const image = Joi.string().allow(null);
const date = Joi.date().allow(null);

const songs_id = Joi.number().integer().positive().required();
const roles_id = Joi.number().integer().positive().required();
const authors_id = Joi.number().integer().positive().required();

export const idSchema = Joi.object({
  id: id.optional(),
});

export const albumIddSchema = Joi.object({
  album_id: id.optional(),
});

export const addSongSchema = Joi.object({
  name: name,
  album_id: album_id,
  position: position,
  lyrics: lyrics.optional(),
  audio: audio,
  video: video.optional(),
  image: image.optional(),
  date: date.optional(),
});

export const updateSongSchema = Joi.object({
  id: id,
  album_id: album_id,
  name: name,
  position: position,
  lyrics: lyrics,
  audio: audio,
  video: video,
  image: image,
  date: date.optional(),
});

export const creditsSchema = Joi.object({
  roles_id: roles_id,
  songs_id: songs_id,
  authors_id: authors_id,
});

