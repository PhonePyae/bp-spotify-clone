import { Router } from "express";
import { createSong, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// @desc    Create a new song
// @route   POST /api/admin/songs
// @access  Private/Admin
router.post("/songs", protectRoute, requireAdmin, createSong);

// @desc    Delete a song
// @route   DELETE /api/admin/songs/:id
// @access  Private/Admin
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);

export default router;