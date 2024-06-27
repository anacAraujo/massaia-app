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

    const querySelect = "SELECT * FROM users WHERE id = ?";
    const [data] = await db.execute(querySelect, [params.id]);

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const queryDelete = "DELETE FROM users WHERE id = ?";
    const [results] = await db.execute(queryDelete, [params.id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User was not deleted!" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const params = await updateUserSchema.validateAsync({
      ...req.body,
      id: req.params.id,
    });

    const { email, password, newPassword, id } = params;

    const querySelect = "SELECT * FROM users WHERE id = ?";
    const [data] = await db.execute(querySelect, [id]);

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, data[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const queryUpdate =
      "UPDATE users SET `email` = ?, `password` = ? WHERE `id`= ?";

    const queryParams = [email, hash, id];

    const [results] = await db.execute(queryUpdate, queryParams);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User was not updated!" });
    }

    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};
