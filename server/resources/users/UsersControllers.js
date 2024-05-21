import { db } from "../../db/db.js";
import bcrypt from "bcryptjs";
import { idSchema, updateUserSchema } from "./usersSchemas.js";

export const getUsers = async (req, res, next) => {
  try {
    const query = "SELECT * FROM users";

    const [results] = await db.execute(query);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "SELECT * FROM users WHERE id = ?";

    const [results] = await db.execute(query, [params.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const params = await idSchema.validateAsync(req.params);

    const query = "DELETE FROM users WHERE `id` = ?";

    const queryParams = [params.id];

    await db.execute(query, queryParams);

    return res.json({ message: "User deleted!" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const params = await updateUserSchema.validateAsync(req.body);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);

    const query = "UPDATE users SET `email` = ?, `password` = ? WHERE `id`= ?";

    const queryParams = [params.email, hash];

    const [results] = await db.execute(query, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User was not updated!" });
    }

    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};
