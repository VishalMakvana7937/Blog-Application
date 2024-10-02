const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const userController = require('../controllers/user_controller');

// Define routes
router.get('/', controllers.apply);
router.post('/addblog', controllers.CreateBlog);
router.get('/blogs', controllers.ReadBlogs);
router.get('/blog/:id', controllers.ReadSingleBlog);
router.put('/Editblog/:id', controllers.editblogcontroller);
router.delete('/blogs/:id', controllers.deleteBlog);  


module.exports = router;
