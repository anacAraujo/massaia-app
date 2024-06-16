import express from "express";
import { getRoles, addRole, deleteRole } from "./rolesControllers.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", authMiddleware, addRole);
router.delete("/:id", authMiddleware, deleteRole);

export default router;