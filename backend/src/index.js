import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // Get the current directory name

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow credentials to be sent
  })
); // Middleware to enable CORS
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(clerkMiddleware()); // This  will add auth to req obj => req.auth.userId
app.use(
  fileupload({
    useTempFiles: true, // Store files in a temporary directory
    tempFileDir: path.join(__dirname, "tmp"), // Directory for temporary files
    createParentPath: true, // Create parent directory if it doesn't exist
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  })
); // Middleware to handle file uploads

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 5009 ");
  connectDB();
});
