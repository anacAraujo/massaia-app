import express from "express";
import { getMoment, getMoments } from "./momentsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getMoments);
router.get("/:id", getMoment);

export default router;
