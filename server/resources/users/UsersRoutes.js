import express from "express";
import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "./usersControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);

export default router;
