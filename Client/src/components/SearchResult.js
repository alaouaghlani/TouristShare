import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Container, Typography } from '@mui/material';

function SearchResults() {
  const { query } = useParams();

  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Update the filtered posts whenever the search query changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts');
        const filtered = response.data.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  // Handle search query changes 
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <Container>
      <h2>Search Results for: {query}</h2>
      <div className="row" style={{ width: '100%' }}>
        {filteredPosts.map((post) => (
          <div key={post._id} className="col-md-4 mb-3">
            <Card className="card-hover">
              {post.photo && (
                <img
                  className="card-img-top"
                  src={`http://localhost:4000/uploads/${post.photo}`}
                  alt={post.title}
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
}

export default SearchResults;
