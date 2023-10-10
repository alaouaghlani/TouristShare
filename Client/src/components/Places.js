import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography } from '@mui/material';
import '../assets/Places.css';
const Places = () => {
  const [posts, setPosts] = useState([]);

  // Effect to fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      // Send a GET request to the server to fetch posts
      const response = await axios.get('http://localhost:4000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <div className="row" style={{ width: '100%' }}>
        {posts.map((post) => (
          <div key={post._id} className="col-md-4 mb-3">
            <Card className="card-hover custom-card">
              {post.photo && (
                <img
                  className="card-img-top"
                  src={`http://localhost:4000/uploads/${post.photo}`}
                  alt={post.title}
                  style={{ height: '70%' }}
                />
              )}

              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Places;
