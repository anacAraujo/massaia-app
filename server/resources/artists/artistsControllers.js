import { db } from "../../db/db.js";

import { idSchema } from "./artistsSchemas.js";

export async function getArtist(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    //TODO
    let query = `
        SELECT massaia.authors.name, massaia.roles.name 
        FROM massaia.songs_has_authors_has_roles 
            JOIN massaia.songs ON massaia.songs.id = massaia.songs_has_authors_has_roles.songs_id
            JOIN massaia.authors ON massaia.authors.id = massaia.songs_has_authors_has_roles.authors_id
            JOIN massaia.roles ON massaia.roles.id = massaia.songs_has_authors_has_roles.roles_id
        WHERE massaia.songs.id = ?`;

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Song not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getArtists(req, res, next) {
  try {
    const query = "SELECT * FROM authors";

    const [results] = await db.execute(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Artist not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function addArtist(req, res, next) {
  try {
    const params = await addArtist.validateAsync(req.body);

    const query = "INSERT INTO authors(`name`) VALUES (?)";

    const queryParams = [params.name];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Artist added!" });
  } catch (error) {
    next(error);
  }
}
