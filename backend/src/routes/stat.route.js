import { Router } from "express";
import { getStats } from "../controllers/stat.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// @desc    Get all stats
// @route   GET /api/stats
// @access  Private/Admin
router.get("/", protectRoute, requireAdmin, getStats);

export default router;