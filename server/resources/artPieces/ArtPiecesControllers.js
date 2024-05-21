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
      "SELECT ap.*, au.name AS author_name, s.name AS song_name FROM massaia.art_pieces ap JOIN massaia.authors au ON ap.author_id=au.id JOIN massaia.songs s ON ap.song_id=s.id";

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

    const query = "SELECT * FROM art_pieces WHERE id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Art piece not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
};
