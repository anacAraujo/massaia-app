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
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
