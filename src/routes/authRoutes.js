import express from "express";
import {
  registerUser,
  loginUser,
  checkEmailExists,
} from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// POST: Check if email exists
router.post("/check-email", checkEmailExists);

export default router;
