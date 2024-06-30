import { db } from "../../db/db.js";
import { sleep } from "../../utils/sleep.js";
import {
  idSchema,
  albumIddSchema,
  addSongSchema,
  updateSongSchema,
  creditsSchema
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

    let query = `SELECT credits.songs_id, credits.authors_id, credits.roles_id, a.name AS authors_name, r.name AS role_name FROM massaia.songs_has_authors_has_roles credits 
                  JOIN massaia.authors a ON massaia.a.id = massaia.credits.authors_id 
                  JOIN massaia.roles r ON massaia.r.id = massaia.credits.roles_id
                WHERE massaia.credits.songs_id = ?;`;

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Song has no credits yet!" });
    }

    const groupedResults = results.reduce(
      (acc, { authors_name, role_name, songs_id, authors_id, roles_id }) => {
        if (!acc[role_name]) {
          acc[role_name] = {
            songs_id: songs_id,
            roles_id: roles_id,
            authors: []
          };
        }
        acc[role_name].authors.push({ authors_name, authors_id });
        return acc;
      },
      {}
    );

    const formattedResponse = Object.keys(groupedResults).map((role_name) => ({
      role: role_name,
      roles_id: groupedResults[role_name].roles_id,
      songs_id: groupedResults[role_name].songs_id,
      authors: groupedResults[role_name].authors
    }));

    res.status(200).json(formattedResponse);
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

export const addCredits = async (req, res, next) => {
  try {
    const params = await creditsSchema.validateAsync(req.body);

    const query = 
      `INSERT INTO massaia.songs_has_authors_has_roles (roles_id, songs_id, authors_id) VALUES (?, ?, ?)`;

    const queryParams = [
      params.roles_id,
      params.songs_id,
      params.authors_id
    ]; 

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Credits added!" });

  } catch (error) {
    next(error);
  }
}

export const updateSong = async (req, res, next) => {
  try {
    const params = await updateSongSchema.validateAsync({
      ...req.body,
      id: req.params.id
    });

    const { album_id, name, position, lyrics, audio, video, image, date, id } = params;

    const query =
      "UPDATE songs SET `album_id` = ?, `name` = ?, `position` = ?, `lyrics` = ?, `audio` = ?, `video` = ?, `image` = ?, `date` = ? WHERE `id`= ?";

    const queryParams = [
      album_id,
      name,
      position,
      lyrics,
      audio,
      video,
      image,
      date,
      id,
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

export const deleteCredits = async (req, res, next) => {
  try {
    const params = await creditsSchema.validateAsync(req.params);

    const query = 
      `DELETE FROM massaia.songs_has_authors_has_roles WHERE roles_id = ? AND songs_id = ? AND authors_id = ?`;

    const queryParams = [
      params.roles_id,
      params.songs_id,
      params.authors_id
    ]

    await db.execute(query, queryParams);
    return res.status(200).json({ message: "Credits has been deleted." });
  } catch (error) {
    next(error);
  }
}
