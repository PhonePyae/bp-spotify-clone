import { Router } from "express";
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin); // Middleware to protect all routes in this file

// @desc    Check if the user is an admin
// @route   GET /api/admin/check
// @access  Private/Admin
router.get("/check", checkAdmin);

// @desc    Create a new song
// @route   POST /api/admin/songs
// @access  Private/Admin
router.post("/songs", createSong);

// @desc    Delete a song
// @route   DELETE /api/admin/songs/:id
// @access  Private/Admin
router.delete("/songs/:id", deleteSong);

// @desc    create an album
// @route   POST /api/admin/ablums
// @access  Private/Admin
router.post("/albums", createAlbum);

// @desc    Delete an album
// @route   DELETE /api/admin/albums/:id
// @access  Private/Admin
router.delete("/albums/:id", deleteAlbum);

export default router;