import express from "express";
import { getArtist, getArtists, addArtist } from "./artistsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/:id", getArtist);
router.get("/", getArtists);
router.post("/", authMiddleware, addArtist);

export default router;
