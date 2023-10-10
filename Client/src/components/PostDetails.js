import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, updatePost } from '../services/opertionPost';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
function PostDetails() {
  const [postdetails, setPostDetails] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // State to track update mode
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  // Retrieve post ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Effect to fetch post details when the component mounts
  useEffect(() => {
    fetchPostById();
  }, []);

  // Function to fetch post details by ID
  const fetchPostById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/post/${id}`);
      if (response.data.length > 0) {
        const post = response.data[0];
        setPostDetails(post);
        setNewTitle(post.title);
        setNewDescription(post.description);
      } else {
        console.error('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post');
    }
  };

  // Function to toggle update mode
  const toggleUpdateMode = () => {
    setIsUpdateMode(!isUpdateMode);
  };
  // Function to update the post
  const update = () => {
    let newPost = {
      title: newTitle,
      description: newDescription,
    };
    updatePost(postdetails._id, newPost, () => {
      fetchPostById();
      toggleUpdateMode(); // Exit update mode after updating
    });
  };
  // Function to delete post
  const handleDeletePost = () => {
    deletePost(id, (message) => {
      navigate('/myPosts');
    });
  };

  return (
    <Container>
      <h1>{postdetails?.title}</h1>
      <br />
      <p className="text">{postdetails?.description} </p>
      <div>
        <div>
          {postdetails?.photo && (
            <img
              className="card-img-top"
              src={`http://localhost:4000/uploads/${postdetails.photo}`}
              alt={postdetails.title}
              style={{ width: '50%' }}
            />
          )}
        </div>
        <div>
          {isUpdateMode ? (
            <div>
              <div>
                <label htmlFor="newTitle">New Title:</label>
                <input
                  type="text"
                  id="newTitle"
                  className="form-control"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="newDescription">New Description:</label>
                <textarea
                  id="newDescription"
                  value={newDescription}
                  className="form-control"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          <button
            className="btn btn-secondary"
            onClick={isUpdateMode ? update : toggleUpdateMode}
          >
            {isUpdateMode ? (
              <>
                <SaveIcon /> Save
              </>
            ) : (
              <>
                <EditIcon /> Edit
              </>
            )}
          </button>
          <button className="btn btn-danger" onClick={handleDeletePost}>
            <DeleteIcon /> Delete
          </button>
        </div>
      </div>
    </Container>
  );
}

export default PostDetails;
