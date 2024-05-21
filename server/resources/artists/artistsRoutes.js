import express from "express";
import { getArtists } from "./artistsControllers.js";

const router = express.Router();

router.get("/:id", getArtists);

export default router;
