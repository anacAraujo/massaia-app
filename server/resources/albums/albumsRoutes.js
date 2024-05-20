import express from "express";
import { getAlbums, getAlbum } from "./albumsControllers.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);

export default router;
