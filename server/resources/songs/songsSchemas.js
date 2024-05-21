import Joi from "joi";

const id = Joi.number().integer().positive();
const album_id = Joi.number().integer().positive().required();
const name = Joi.string().required();
const position = Joi.number().integer().positive().required();
const lyrics = Joi.string();
const audio = Joi.string();
const video = Joi.string();
const image = Joi.string();
const date = Joi.date();

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
  audio: audio.optional(),
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
  date: date,
});
