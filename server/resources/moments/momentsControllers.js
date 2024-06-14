import { db } from "../../db/db.js";
import {
  idSchema,
  addMomentSchema,
  updateMomentSchema,
} from "./momentsSchemas.js";

export const getMoments = async (req, res, next) => {
  try {
    const query = "SELECT * FROM moments";

    const [results] = await db.execute(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Moments not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getMoment = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "SELECT * FROM moments WHERE id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Moment not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
};

export const addMoment = async (req, res, next) => {
  try {
    const params = await addMomentSchema.validateAsync(req.body);

    const query =
      "INSERT INTO moments(`name`, `image`, `video`, `date`) VALUES (?, ?, ?, ?)";

    const queryParams = [params.name, params.image, params.video, params.date];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Moment added!" });
  } catch (error) {
    next(error);
  }
};

export const updateMoment = async (req, res, next) => {
  try {
    const params = await updateMomentSchema.validateAsync(req.body);

    const query =
      "UPDATE moment SET `name` = ?, `image` = ?, `video` = ?, `date` = ? WHERE `id`= ?";

    const queryParams = [
      params.name,
      params.image,
      params.video,
      params.date,
      params.id,
    ];

    const [results] = await db.execute(query, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Moment was not updated!" });
    }

    return res.status(200).json({ message: "Moment updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteMoment = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM moments WHERE `id` = ?";

    const queryParams = [params.id];

    await db.execute(query, queryParams);
    return res.status(200).json({ message: "Moment has been deleted." });
  } catch (error) {
    next(error);
  }
};
