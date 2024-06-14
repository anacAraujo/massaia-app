import express from "express";
import { getRoles, addRole } from "./rolesControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", authMiddleware, addRole);

export default router;