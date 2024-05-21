import express from "express";
import { getSongCredits } from "./artistsControllers.js";

const router = express.Router();

router.get("/:id", getSongCredits);

export default router;
