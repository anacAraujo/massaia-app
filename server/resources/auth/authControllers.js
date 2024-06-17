import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../db/db.js";
import { registerSchema, loginSchema } from "./authSchemas.js";

export const login = async (req, res, next) => {
  try {
    const params = await loginSchema.validateAsync(req.body);

    const query = "SELECT * FROM users WHERE email = ?";

    const [data] = await db.query(query, [params.email]);
    if (data.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    //TODO change secret use .env
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const params = await registerSchema.validateAsync(req.body);

    const querySelect = "SELECT * FROM users WHERE email = ?";

    const [data] = await db.execute(querySelect, [params.email]);

    if (data.length) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(params.password, salt);

    const queryInsert = "INSERT INTO users(`email`,`password`) VALUES (?)";
    const queryParams = [params.email, hash];
    await db.query(queryInsert, [queryParams]);
    return res.status(200).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("acess_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "User made logout!" });
  } catch (error) {
    next(error);
  }
};
