import express from "express";
import { auth } from "../middleware/auth.js";
import restrict from "../middleware/isAdmin.js";
import {totalLenghtOfUsers}  from "../controller/totalLenght.js";

const router = express.Router();

router.get("/totalUsers", auth, restrict("admin", "super-admin"), totalLenghtOfUsers);
export default router