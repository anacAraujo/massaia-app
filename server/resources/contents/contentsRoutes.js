import express from "express";
import {
  getContent,
  getContents,
  addContent,
  updateContent,
  deleteContent,
} from "./contentsControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getContents);
router.get("/:id", getContent);
router.post("/", authMiddleware, addContent);
router.put("/:id", authMiddleware, updateContent);
router.delete("/:id", authMiddleware, deleteContent);

export default router;
