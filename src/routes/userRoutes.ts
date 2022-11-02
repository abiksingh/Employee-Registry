import express from "express";
import {
  authUser,
  getUsers,
  registerUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(getUsers);
router.route("/home").post(protect, registerUser);

export default router;
