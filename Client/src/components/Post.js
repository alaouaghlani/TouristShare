import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Post() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  // Event handler to create a new post
  const handleCreatePost = () => {

    if (!title || !description || !selectedFile) {
      toast.error('Please fill in all fields before creating a post. ', {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
      });
      return;
    }

    // Create a FormData object to send post data including the file
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', selectedFile);

    // Retrieve the user's authentication token from local storage
    const token = localStorage.getItem('token');

    // Configure the HTTP headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send a POST request to create the new post
    axios
      .post('http://localhost:4000/posts', formData, config)
      .then((response) => {
        console.log('Post created successfully:');
        toast.success('Post created successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
          theme: "colored",
        });
        navigate('/places');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  
  return (
    <div className="container mt-4">
      <h2>Create a New Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Upload a Photo:
          </label>
          <input
            type="file"
            id="photo"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          onClick={handleCreatePost}
          className="btn btn-primary"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default Post;
