import express from "express";
import {
  updateEmployee,
  employees,
  getEmployeeById,
  searchUsers,
} from "../controller/employeeController.js";
import { auth } from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();

// patch
router.patch("/:employeeId", updateEmployee);
// get
router.get("/users", auth, restrict("admin", "super-admin"), employees);
// Route to get a single employee by ID
router.get("/:id", auth, restrict("admin", "super-admin"), getEmployeeById);
router.get(
  "/users/search",
  auth,
  restrict("admin", "super-admin"),
  searchUsers
);

export default router;
