import axios from 'axios';

export const getPostById = (id, callback) => {
    axios.get(`http://localhost:4000/post/${id}`)
    .then((res)=>callback(res)
    )
    .catch((err)=>callback(err))
  };
  

export const deletePost = (id, callback) => {
    axios
      .delete(`http://localhost:4000/post/${id}`)
      .then((message) => callback(message))
      .catch((err) => callback(err));
  };
 
  export const updatePost = (id, post, callback) => {
    axios
      .put(`http://localhost:4000/update/${id}`, post)
      .then((res) => {
        callback(res);
      })
      .catch((error) => {
        callback(error);
      });
  };