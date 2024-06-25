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

export async function getCredits(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    let query = `SELECT a.name AS authors_name, r.name AS role_name FROM massaia.songs_has_authors_has_roles credits 
                  JOIN massaia.authors a ON massaia.a.id = massaia.credits.authors_id 
                  JOIN massaia.roles r ON massaia.r.id = massaia.credits.roles_id
                WHERE massaia.credits.songs_id = ?;`;

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Song has no credits yet!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
}

export const addSong = async (req, res, next) => {
  try {
    const params = await addSongSchema.validateAsync(req.body);

    const query =
      "INSERT INTO songs(`album_id`, `name`, `position`, `lyrics`, `audio`, `video`, `image`, `date`) VALUES (?,?,?,?,?,?,?,?)";

    const queryParams = [
      params.album_id,
      params.name,
      params.position,
      params.lyrics,
      params.audio,
      params.video,
      params.image,
      params.date,
    ];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Song added!" });
  } catch (error) {
    next(error);
  }
};

export const updateSong = async (req, res, next) => {
  try {
    const params = await updateSongSchema.validateAsync(req.body);

    const query =
      "UPDATE songs SET `album_id` = ?, `name` = ?, `position` = ?, `lyrics` = ?, `audio` = ?, `video` = ?, `image` = ?, `date` = ? WHERE `id`= ?";

    const queryParams = [
      params.album_id,
      params.name,
      params.position,
      params.lyrics,
      params.audio,
      params.video,
      params.image,
      params.date,
      params.id,
    ];

    const [results] = await db.execute(query, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Song was not updated!" });
    }

    return res.status(200).json({ message: "Song updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM songs WHERE `id` = ?";

    const queryParams = [params.id];

    await db.execute(query, queryParams);
    return res.status(200).json({ message: "Song has been deleted." });
  } catch (error) {
    next(error);
  }
};
