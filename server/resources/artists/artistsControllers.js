import { db } from "../../db/db.js";
import { addArtistSchema, updateArtistSchema, idSchema } from "./artistsSchemas.js";

export async function getArtists(req, res, next) {
  try {
    const query = "SELECT * FROM authors";

    const [results] = await db.execute(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Artists not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function getArtist(req, res, next) {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "SELECT * FROM authors WHERE id = ?"

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Artist not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
}

export async function addArtist(req, res, next) {
  try {
    const params = await addArtistSchema.validateAsync(req.body);

    const query = "INSERT INTO authors(`name`, `image`, `title`) VALUES (?, ?, ?)";

    const queryParams = [params.name, params.image, params.title];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Artist added!" });
  } catch (error) {
    next(error);
  }
}

export const updateArtist = async (req, res, next) => {
  try {
    const params = await updateArtistSchema.validateAsync({
      ...req.body,
      id: req.params.id
    });

    const { name, image, title, id } = params;
    
    const query =
      "UPDATE authors SET `name` = ?, `image` = ?, `title` = ? WHERE `id`= ?";

    const queryParams = [
      name,
      image,
      title,
      id,
    ];

    const [results] = await db.execute(query, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Artist was not updated!" });
    }

    return res.status(200).json({ message: "Artist updated" });
  } catch (error) {
    next(error);
  }
}

export const deleteArtist = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM authors WHERE `id` = ?";

    const queryParams = [params.id];

    await db.execute(query, queryParams);
    return res.status(200).json({ message: "Artist has been deleted." });
  } catch (error) {
    next(error);
  }
};
