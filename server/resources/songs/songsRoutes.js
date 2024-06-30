import express from "express";
import {
  getSong,
  getSongs,
  getCredits,
  addSong,
  updateSong,
  deleteSong,
  addCredits,
  deleteCredits
} from "./songsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);
router.get("/:id/credits", getCredits);
router.post("/", authMiddleware, addSong);
router.post("/:id/credits", authMiddleware, addCredits);
router.put("/:id", authMiddleware, updateSong);
router.delete("/:id", authMiddleware, deleteSong);
router.delete("/:songs_id/credits/:authors_id/:roles_id", authMiddleware, deleteCredits);

export default router;
