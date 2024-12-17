import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a blog
router.post("/", authMiddleware, createBlog);

// Get all blogs
router.get("/", getBlogs);
// Route to get a blog by its ID
router.get("/:id", getBlogById);

// Update a blog
router.put("/:id", authMiddleware, updateBlog);

// Delete a blog
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
