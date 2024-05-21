import express from "express";
import { getSong, getSongs } from "./songsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:id", getSong);

export default router;
