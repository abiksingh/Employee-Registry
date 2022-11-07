import express from "express";
import {
  addComment,
  addEmployees,
  authEmployee,
  deleteEmployee,
  editEmployees,
  getEmployees,
  registerEmployee,
} from "../controllers/employeeController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/register").post(registerEmployee);
router.route("/login").post(authEmployee);
router.route("/home").get(protect, getEmployees).post(protect, addEmployees);
router
  .route("/:id")
  .put(protect, editEmployees)
  .delete(protect, deleteEmployee);
router.route("/employeeDetails/:id").post(protect, addComment);

export default router;
