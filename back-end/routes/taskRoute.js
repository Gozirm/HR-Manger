import express from "express";
import { auth } from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
import { createTask, getAllTasks, deleteTask, editTask, getTaskById } from "../controller/taskController.js";

const router = express.Router();

router.post("/task", auth, restrict("admin", "super-admin"), createTask);
router.get("/", auth, restrict("admin", "super-admin"), getAllTasks);
// Route to delete a task by ID
router.delete("/:id", auth, restrict("admin", "super-admin"), deleteTask);

// Route to edit a task by ID
router.patch("/:id", auth, restrict("admin", "super-admin"), editTask);
// get a single taks
router.get("/:id", auth, restrict("admin", "super-admin"), getTaskById);

export default router;
