import axios from 'axios';

export const signup = async (user, callback) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/users/signup',
      user
    );
    if (response && response.data) {
      callback(null, response.data);
    } else {
      callback({ error: 'Unexpected response from the server' }, null);
    }
  } catch (error) {
    callback(error, null);
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/users/login',
      user
    );

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

