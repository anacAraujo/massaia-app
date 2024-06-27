import express from "express";
import { getArtist, getArtists, addArtist, deleteArtist, updateArtist } from "./artistsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/:id", getArtist);
router.get("/", getArtists);
router.post("/", authMiddleware, addArtist);
router.put("/:id", authMiddleware, updateArtist);
router.delete("/:id", authMiddleware, deleteArtist);

export default router;
