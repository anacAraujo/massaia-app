import express from "express";
import {
  getMoment,
  getMoments,
  addMoment,
  updateMoment,
  deleteMoment,
} from "./momentsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getMoments);
router.get("/:id", getMoment);
router.post("/", authMiddleware, addMoment);
router.put("/:id", authMiddleware, updateMoment);
router.delete("/:id", authMiddleware, deleteMoment);

export default router;
