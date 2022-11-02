import express from "express";
import {
  authEmployee,
  getEmployees,
  registerEmployee,
} from "../controllers/employeeController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/register").post(registerEmployee);
router.route("/login").post(authEmployee);
router.route("/").get(getEmployees);
router.route("/home").post(protect, registerEmployee);

export default router;
