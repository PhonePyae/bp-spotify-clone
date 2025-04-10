import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getTrendingSongs, getMadeForYouSongs } from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// @desc    Get all songs
// @route   GET /api/songs
// @access  Private/Admin
router.get("/", protectRoute, requireAdmin, getAllSongs);

// @desc    Get featured songs
// @route   GET /api/songs/featured
// @access  Public
router.get("/featured", getFeaturedSongs);

// @desc    Get trending songs
// @route   GET /api/songs/trending
// @access  Public
router.get("/trending", getTrendingSongs);

// @desc    Get made-for-you songs
// @route   GET /api/songs/made-for-you
// @access  Public
router.get("/made-for-you", getMadeForYouSongs);

export default router;