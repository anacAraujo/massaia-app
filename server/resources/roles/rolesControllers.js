import { db } from "../../db/db.js";
import { addRoleSchema } from "./rolesSchema.js"

export async function getRoles(req, res, next) {
  try {
    let query = "SELECT * FROM roles";

    const [results] = await db.execute(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Role not found!" });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export const addRole = async (req, res, next) => {
  try {
    const params = await addRoleSchema.validateAsync(req.body);

    const query =
      "INSERT INTO roles(`name`) VALUES (?)";

    const queryParams = [
      params.name,
    ];

    const [results] = await db.execute(query, queryParams);

    return res.status(200).json({ message: "Role added!" });
  } catch (error) {
    next(error);
  }
} 
