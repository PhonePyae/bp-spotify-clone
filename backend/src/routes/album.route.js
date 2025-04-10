import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controllers/album.controller.js";

const router = Router();

// @desc    Get all albums
// @route   GET /api/albums
// @access  Public
router.get("/", getAllAlbums); // Get all albums

// @desc    Get album by ID
// @route   GET /api/albums/:id
// @access  Public
router.get("/:id", getAlbumById); // Get album by ID 

export default router;