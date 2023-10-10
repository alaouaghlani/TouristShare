const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Post = require('../models/postModel');

// User registration
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Create a new User instance with the hashed password
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => {
          console.error('Error saving user:', error);
          res
            .status(500)
            .json({ error: 'An error occurred while saving the user.' });
        });
    })
    .catch((error) => {
      console.error('Error hashing password:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while hashing the password.' });
    });
};

// User login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé!' });
      }
      // Compare the provided password with the stored hashed password using bcrypt
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send('Mot de passe incorrect');
          }
          // Generate a JSON Web Token (JWT) for user authentication
          const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h',
          });

          return res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          console.error('Error comparing passwords:', error);
          return res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error('Error finding user by email:', error);
      return res.status(500).json({ error: 'Internal server error' });
    });
};

// Get posts created by a specific user
exports.postCreated = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const createdPost = await Post.find({ author: userId });
    res.json(createdPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
};
