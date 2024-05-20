import { db } from "../../db/db.js";

import { idSchema } from "./creditsSchemas.js";

export async function getSongCredits(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

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
