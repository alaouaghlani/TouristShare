import { Card, CardContent, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Myposts() {
  const [createdPosts, setCreatedPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts created by the user

  const fetchPosts = async () => {
    try {
      // Retrieve the user's authentication token from local storage
      const token = localStorage.getItem('token');

      // Send a GET request to the server to fetch user-created posts
      const response = await axios.get(
        'http://localhost:4000/users/createdpost',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCreatedPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>
      <div className="row" style={{ width: '100%' }}>
        {createdPosts.map((post) => (
          <div key={post._id} className="col-md-4 mb-3">
            <Card className="card-hover ">
              {post.photo && (
                <img
                  className="card-img-top"
                  src={`http://localhost:4000/uploads/${post.photo}`}
                  alt={post.title}
                  style={{ height: '60%' }}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>

                <button className="btn btn-success">
                  <Link
                    to={`/postdetails/${post._id}`}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    More Details
                  </Link>
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Myposts;
