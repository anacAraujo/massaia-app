import express from "express";
import { getAlbum } from "./albumsControllers.js";

const router = express.Router();

router.get("/:id", getAlbum);

export default router;
