import express from "express";
import { getSong, getSongs } from "./songsControllers.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);

export default router;
