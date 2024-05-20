import { db } from "../../db/db.js";

import { idSchema } from "./albumsSchemas.js";

export async function getAlbums(req, res, next) {
  try {
    let query = "SELECT * FROM albums";

    const [results] = await db.execute(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Album not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getAlbum(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    let query =
      "SELECT * FROM albums JOIN songs ON albums.id = songs.album_id WHERE albums.id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Album not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getAlbumSongs(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    let query = `
      SELECT * 
      FROM albums 
        JOIN songs ON songs.album_id = albums.id
      WHERE albums.id = ?`;

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Album not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}
