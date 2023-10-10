const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const connectToMongoDB = require('./configuration/connexionMongo');
const path = require('path');

// Connect to MongoDB database
connectToMongoDB();

app.use(express.json());
app.use(cors());

// Use user-related routes
app.use(userRoutes);

// Use post-related routes
app.use(postRoutes);

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

app.listen(port, () => console.log(`Server is running on port ${port}`));
