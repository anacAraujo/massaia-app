import express from "express";
import {
  getSong,
  getSongs,
  getCredits,
  addSong,
  updateSong,
  deleteSong,
} from "./songsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);
router.get("/:id/credits", getCredits);
router.post("/", authMiddleware, addSong);
router.put("/:id", authMiddleware, updateSong);
router.delete("/:id", authMiddleware, deleteSong);

export default router;
