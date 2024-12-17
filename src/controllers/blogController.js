import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  const { title, description, imageLink } = req.body; // Include imageLink here

  // Validate input fields
  if (!title || !description || !imageLink) {
    return res
      .status(400)
      .json({ message: "Title, description, and image link are required." });
  }

  try {
    // Check if user is authenticated and has a valid ID
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create a new blog post, including the imageLink
    const newBlog = new Blog({
      title,
      description,
      imageLink, // Store the imageLink in the blog post
      createdBy: req.user.id,
    });

    // Save the blog post to the database
    await newBlog.save();

    // Return the created blog post as a response
    res.status(201).json(newBlog);
  } catch (error) {
    // Log the error and return a 500 response
    console.error("Error creating blog:", error);
    res.status(500).json({ message: error.message });
  }
};

// In your blogController.js
export const getBlogById = async (req, res) => {
  const { id } = req.params; // Retrieve the ID from URL parameters

  try {
    // Find the blog by ID and populate the 'createdBy' field with 'name' and 'avatar'
    const blog = await Blog.findById(id).populate("createdBy", "name avatar");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog); // Return the populated blog
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name email");
    console.log(blogs); // Log to ensure id is present
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.createdBy.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot update this blog" });
    }

    blog.title = req.body.title || blog.title;
    blog.description = req.body.description || blog.description;
    blog.imageLink = req.body.imageLink || blog.imageLink;

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    // Fetch the blog by ID
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Ensure the user is authorized to delete this blog
    if (blog.createdBy.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot delete this blog" });
    }

    // Delete the blog if the user is authorized
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
