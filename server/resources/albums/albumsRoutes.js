import express from "express";
import { getAlbums, getAlbum, updateAlbum } from "./albumsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.put("/:id", authMiddleware, updateAlbum);

export default router;
