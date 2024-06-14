import express from "express";
import {
  getSong,
  getSongs,
  addSong,
  updateSong,
  deleteSong,
} from "./songsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);
router.post("/", authMiddleware, addSong);
router.put("/:id", authMiddleware, updateSong);
router.delete("/:id", authMiddleware, deleteSong);

export default router;
