import express from "express";
import { getSongsCredits } from "./creditsControllers.js";

const router = express.Router();

router.get("/:id", getSongsCredits);

export default router;
