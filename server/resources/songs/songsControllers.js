import { query } from "express";
import { db } from "../../db/db.js";

import { idSchema, albumIddSchema } from "./songsSchemas.js";

export async function getSongs(req, res, next) {
  try {
    const params = await albumIddSchema.validateAsync(req.query);

    let query =
      "SELECT s.*, a.name AS album_name, a.cover AS album_cover FROM songs s JOIN albums a ON a.id = s.album_id ORDER BY a.id ASC, s.position ASC";

    if (params.album_id) {
      query += " WHERE songs.album_id=:album_id";
    }

    const [results] = await db.execute(query, params);

    if (results.length === 0) {
      return res.status(404).json({ message: "Songs not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getSong(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    let query = "SELECT * FROM songs WHERE id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Song not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
}
