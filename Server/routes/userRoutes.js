const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
const auth = require('../middleware/auth');

// Route for user registration (signup)
router.post('/users/signup', userCtrl.signup);

// Route for user login
router.post('/users/login', userCtrl.login);

// Route for getting posts created by a specific user
router.get('/users/createdpost', auth, userCtrl.postCreated);

module.exports = router;


