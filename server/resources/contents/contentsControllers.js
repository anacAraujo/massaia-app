import { db } from "../../db/db.js";
import {
  idSchema,
  addContentSchema,
  updateContentSchema,
} from "./contentsSchemas.js";

export const getContents = async (req, res, next) => {
  try {
    const query = "SELECT * FROM contents";

    const [results] = await db.execute(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Contents not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getContent = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "SELECT * FROM contents WHERE id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Content not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
};

export const addContent = async (req, res, next) => {
  try {
    const params = await addContentSchema.validateAsync(req.body);

    const query =
      "INSERT INTO contents(`topic`, `text`) VALUES (?, ?)";

    const queryParams = [params.topic, params.text];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Content added!" });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  try {
    const params = await updateContentSchema.validateAsync({
      ...req.body,
      id: req.params.id
    });

    const { topic, text, id } = params;

    const query =
      "UPDATE contents SET `topic` = ?, `text` = ? WHERE `id`= ?";

    const queryParams = [
      topic,
      text,
      id,
    ];

    const [results] = await db.execute(query, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Content was not updated!" });
    }

    return res.status(200).json({ message: "Content updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM contents WHERE `id` = ?";

    const queryParams = [params.id];

    await db.execute(query, queryParams);
    return res.status(200).json({ message: "Content has been deleted." });
  } catch (error) {
    next(error);
  }
};

