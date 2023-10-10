const Post = require('../models/postModel');
const upload = require('../middleware/multer');
const User = require('../models/userModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      // Attach the filename of the uploaded photo if available
      photo: req.file ? req.file.filename : '',
      author: userId,
    });

    const savedPost = await post.save();
    // Update the user's posts array with the newly created post ID
    await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

    res.status(200).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the post.' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.status(200).json({ message: `${post.nom} is successfully deleted` });
    }
  } catch (err) {
    res.status(400).json({ error: `Error deleting post ${err}` });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.status(200).json([post]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post by ID' });
  }
};

// Update a post by ID
exports.updatepost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) {
      res.status(404).json({ error: 'post not found' });
    } else {
      res.status(200).json({ message: `${post.nom} is successfully updated` });
    }
  } catch (err) {
    res.status(400).json({ error: `Error updating postment ${err}` });
  }
};
