import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private
router.get("/", protectRoute, getAllUsers);

// To Do: getMessages

export default router;