import { db } from "../../db/db.js";
import {
  idSchema,
  songIddSchema,
  addArtPieceSchema,
  updateArtPieceSchema,
} from "./artPiecesSchemas.js";

export const getArtPieces = async (req, res, next) => {
  try {
    const params = await songIddSchema.validateAsync(req.query);

    let query =
      "SELECT ap.*, au.name AS author_name, s.album_id AS album_id, s.name AS song_name FROM massaia.art_pieces ap JOIN massaia.authors au ON ap.author_id=au.id JOIN massaia.songs s ON ap.song_id=s.id";

    if (params.song_id) {
      query += " WHERE ap.song_id=:song_id";
    }

    const [results] = await db.execute(query, params);

    if (results.length === 0) {
      return res.status(404).json({ message: "Art pieces not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getArtPiece = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "SELECT ap.*, au.name AS author_name, s.album_id AS album_id, s.name AS song_name FROM massaia.art_pieces ap JOIN massaia.authors au ON ap.author_id=au.id JOIN massaia.songs s ON ap.song_id=s.id WHERE ap.id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Art piece not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
};

export const addArtPiece = async (req, res, next) => {
  try {
    const params = await addArtPieceSchema(req.body);

    const query =
      "INSERT INTO art_pieces(`song_id`, `author_id`, `image`, `date`) VALUES (?,?,?,?)";

    const queryParams = [
      params.song_id,
      params.author_id,
      params.image,
      params.date,
    ];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Art Piece added!" });
  } catch (error) {
    next(error);
  }
};

export const updateArtPiece = async (req, res, next) => {
  try {
    const params = await updateArtPieceSchema.validateAsync(req.body);

    const query =
      "UPDATE art_pieces SET `song_id` = ?, `author_id` = ?, `image` = ?, `date` = ? WHERE `id`= ?";

    const queryParams = [
      params.song_id,
      params.author_id,
      params.image,
      params.date,
      params.id,
    ];

    const [results] = await db.execute(query, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Art Piece was not updated!" });
    }

    return res.status(200).json({ message: "Moment updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteArtPiece = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM art_pieces WHERE `id` = ?";

    const queryParams = [params.id];

    await db.execute(query, queryParams);
    return res.status(200).json({ message: "Art Piece has been deleted." });
  } catch (error) {
    next(error);
  }
};
