const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers'); 
const upload = require('../middleware/multer'); 
const auth = require('../middleware/auth'); 

// Route for creating a new post
router.post('/posts', upload.single('photo'), auth, postController.createPost);

// Route for getting all posts
router.get('/posts', postController.getAllPosts);

// Route for getting a post by ID
router.get('/post/:id', postController.getPostById);

// Route for deleting a post by ID
router.delete('/post/:id', postController.deletePost);

// Route for updating a post by ID
router.put('/update/:id', postController.updatepost);

module.exports = router; 
