import express from "express";
import {
  getArtPiece,
  getArtPieces,
  addArtPiece,
  updateArtPiece,
  deleteArtPiece,
} from "./artPiecesControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getArtPieces);
router.get("/:id", getArtPiece);
router.post("/", authMiddleware, addArtPiece);
router.put("/:id", authMiddleware, updateArtPiece);
router.delete("/:id", authMiddleware, deleteArtPiece);

export default router;
