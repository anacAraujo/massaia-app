import express from "express";
import { getSongCredits } from "./creditsControllers.js";

const router = express.Router();

router.get("/:id", getSongCredits);

export default router;
