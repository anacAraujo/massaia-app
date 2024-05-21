import express from "express";
import { getArtPiece, getArtPieces } from "./artPiecesControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getArtPieces);
router.get("/:id", getArtPiece);

export default router;
