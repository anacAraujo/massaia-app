import express from "express";
import { getAlbums, getAlbum, getAlbumSongs } from "./albumsControllers.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.get("/:id/songs", getAlbumSongs);

export default router;
