import { Router } from "express";
import { createSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// @desc    Create a new song
// @route   POST /api/admin/songs
// @access  Private/Admin
router.post("/songs", protectRoute, requireAdmin, createSong);

export default router;