import React, { useState, useEffect } from 'react';
import Sidenav from '../sidenav';
import {
  Box, Card, CardContent, Typography, Grid, IconButton, Tooltip,
  CircularProgress, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

const API_URL = 'http://localhost:5000/blogs';
const edit_url = 'http://localhost:5000/Editblog';

const Allblog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', author: '', type: '', excerpt: '' });

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleAdd = () => {
    console.log('Add new blog post');
  };

  const handleEdit = (post) => {
    setEditPost(post);  // Save the entire post object including its ID
    setFormValues({
      title: post.title,
      author: post.author,
      type: post.type,
      excerpt: post.excerpt,
    });
    setDialogOpen(true);  // Open the edit dialog
  };
  const handleDelete = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete');
        }

        setBlogPosts(blogPosts.filter(post => post._id !== id)); 
    } catch (error) {
        setError(error.message);  // Handle the error appropriately
    }
};


  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!editPost?._id) {
        throw new Error("No blog post selected for update.");
      }

      const response = await fetch(`${edit_url}/${editPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Failed to update the blog post');
      }

      const updatedPost = await response.json();
      
      // Update the blog list in the state
      setBlogPosts(blogPosts.map(post => post._id === updatedPost._id ? updatedPost : post));
      
      setDialogOpen(false); // Close the dialog on success
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{`Error: ${error}`}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          All Blog Posts
        </Typography>
        <Tooltip title="Add New Post">
          <IconButton color="primary" onClick={handleAdd} >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Grid container spacing={3} mt={2}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={post._id || index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.author} - {post.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(post)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(post._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Blog Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={formValues.title}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            fullWidth
            variant="outlined"
            value={formValues.author}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            fullWidth
            variant="outlined"
            value={formValues.type}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="excerpt"
            label="Excerpt"
            fullWidth
            variant="outlined"
            value={formValues.excerpt}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Allblog;
