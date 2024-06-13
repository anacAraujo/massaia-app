import { query } from "express";
import { db } from "../../db/db.js";
import { sleep } from "../../utils/sleep.js";

import {
  idSchema,
  albumIddSchema,
  addSongSchema,
  updateSongSchema,
} from "./songsSchemas.js";

export async function getSongs(req, res, next) {
  try {
    const params = await albumIddSchema.validateAsync(req.query);

    let query =
      "SELECT s.*, a.name AS album_name, a.cover AS album_cover FROM songs s JOIN albums a ON a.id = s.album_id";

    if (params.album_id) {
      query += " WHERE s.album_id=:album_id";
    }

    query += " ORDER BY a.id ASC, s.position ASC";

    const [results] = await db.execute(query, params);

    if (results.length === 0) {
      return res.status(404).json({ message: "Songs not found!" });
    }

    await sleep(1000);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getSong(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    let query =
      "SELECT s.*, a.name AS album_name, a.cover AS album_cover FROM songs s JOIN albums a ON a.id = s.album_id WHERE s.id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Song not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
}
