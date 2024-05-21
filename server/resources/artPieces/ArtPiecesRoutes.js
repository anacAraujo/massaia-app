import express from "express";
import { getArtPiece, getArtPieces } from "./ArtPiecesControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const app = express.Router();

app.get("/", getArtPieces);
app.get("/:id", getArtPiece);

export default app;
