import express from "express";
import { auth } from "../middleware/auth.js";
import {
  applyForLeave,
  approveLeave,
  declineLeave,
  getAllEmployeeActivties,
  getAllLeaves,
  getEmployeeLeaves,
  getSingleLeave,
  getEmployee,
  leaveType,
} from "../controller/leaveController.js";
import restrict from "../middleware/isAdmin.js";
const router = express.Router();

router.post("/apply", auth, applyForLeave);
router.get("/all-leaves", auth, restrict("admin", "super-admin"), getAllLeaves);
router.get("/:leaveId", auth, restrict("admin", "super-admin"), getSingleLeave);

router.patch(
  "/approve/:leaveId",
  auth,
  restrict("admin", "super-admin"),
  approveLeave
);
router.patch(
  "/:leaveId/decline",
  auth,
  restrict("admin", "super-admin"),
  declineLeave
);
router.get("/employee/leaves", auth, getEmployeeLeaves);

router.get("/employee/activities", auth, getAllEmployeeActivties);
router.get("/employee/activitie", auth, getEmployee);
router.get("/leave/Type", auth, leaveType )

export default router;
