import express from "express";
import { getAlbum, getAlbumSongs } from "./albumsControllers.js";

const router = express.Router();

router.get("/:id", getAlbum);
router.get("/:id/songs", getAlbumSongs);

export default router;
