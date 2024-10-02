const bloglist = require("../models/models");

const CreateBlog = async (req, res) => {
    try {
        const { title, author, type } = req.body;

        console.log("Received data:", { title, author, type });  // Debug log

        // Check if all required fields are present
        if (!title || !author || !type) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new blog entry with only the required fields
        const newBlog = new bloglist({ title, author, type });
        await newBlog.save();

        // Send response with the created blog entry
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Error creating blog:", error);  // Debug log
        res.status(500).json({ error: 'Internal server error' });
    }
};


const ReadBlogs = async (req, res) => {
    try {
        const blogs = await bloglist.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const ReadSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await bloglist.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editblogcontroller = async (req, res) => {
    try {
        const { id } = req.params;  // Extract ID from the URL
        const { title, author, type } = req.body;  // Extract updated fields

        const blog = await bloglist.findById(id);  // Find blog by _id in MongoDB
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Update blog fields
        blog.title = title || blog.title;
        blog.author = author || blog.author;
        blog.type = type || blog.type;

        // Save the updated blog
        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);  // Respond with the updated blog data
    } catch (err) {
        console.error("Error while updating blog:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await bloglist.findByIdAndDelete(id);  // Correct Model Name here

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post deleted successfully', blog: deletedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const apply = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to Home" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { CreateBlog, apply, ReadBlogs, ReadSingleBlog, editblogcontroller, deleteBlog };
