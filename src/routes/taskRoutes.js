import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

// Task Routes
router.post("/", authMiddleware, createTask);  // Create task
router.get("/all-tasks", authMiddleware, getTasks); // Get all user tasks
router.put("/:id", authMiddleware, updateTask); // Edit task (NEW)
router.delete("/:id", authMiddleware, deleteTask); // Delete task

export default router;
