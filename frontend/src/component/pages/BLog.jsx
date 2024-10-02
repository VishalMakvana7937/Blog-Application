import React, { useState } from 'react';
import Sidenav from '../sidenav';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    type: '',
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);  // Debug log
    try {
      const response = await fetch('http://localhost:5000/addblog', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          author: '',
          type: '',
        });
        navigate("/allblog");
      } else {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);  // Debug log
        setError('Failed to submit blog. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);  // Debug log
      setError('Failed to submit blog. Please check your network and try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Blog Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            label="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            required
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit Blog
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;
