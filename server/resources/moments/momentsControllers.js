import { db } from "../../db/db.js";
import { idSchema } from "./momentsSchemas.js";

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
