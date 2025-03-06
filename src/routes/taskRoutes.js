import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { createTask, getTasks, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
