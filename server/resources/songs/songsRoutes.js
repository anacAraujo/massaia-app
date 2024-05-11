import express from "express";
import { getSong } from "./songsControllers.js";

const router = express.Router();

router.get("/:id", getSong);

export default router;
