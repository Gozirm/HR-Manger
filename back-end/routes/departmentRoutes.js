import express from "express";
import { createDepartment,getAllAdmins,getDepartments,getSingleDepartment, getTotalCountsOfAdmins } from "../controller/departmentController.js";
import { auth } from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";

const router = express.Router()
router.post("/create", createDepartment)
router.get("/all-departments",auth,restrict("admin", "super-admin"),getDepartments);
router.get("/counts-departments",auth,restrict("admin", "super-admin"),getTotalCountsOfAdmins);
router.get("/departments/:id", auth, restrict("admin", "super-admin"), getSingleDepartment);
router.get("/roles", getAllAdmins)

export default router