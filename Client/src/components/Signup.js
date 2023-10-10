import React, { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import bgForms from '../images/bg-forms.jpg';
import '../assets/AuthForm.css';
import { signup } from '../services/operationsUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for the signup button
  const handleSignup = async () => {
    if (!email || !password) {
      if (!email) {
        toast.error('Email required !', {
          position: toast.POSITION.BOTTOM_LEFT,
          theme: "colored",
        });
      }
      if (!password) {
        toast.error('Password required !', {
          position: toast.POSITION.BOTTOM_LEFT,
          theme: "colored",
        });
      }
      return;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Email should be user@something.com ', {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
      });
      return; // Prevent further execution
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long', {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
      });
      return;
    }
    // Create a user object with email and password
    const newUser = {
      email: email,
      password: password,
    };

    try {
      // Call the signup service to create a new user
      signup(newUser, (error, response) => {
        if (error) {
          console.error('An error occurred:', error);
          toast.error('Account already exist!', {
            position: toast.POSITION.BOTTOM_LEFT,
            theme: "colored",
          });
        } else if (response && response.message) {
          console.log(response.message);
          setEmail('');
          setPassword('');
          toast.success('Account created successfully! Login to continue', {
            position: toast.POSITION.BOTTOM_LEFT,
            theme: "colored",
          });
          navigate('/login');
        } else {
          console.error('Unexpected response from the server');
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="auth-form" style={{ backgroundImage: `url(${bgForms})` }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="form-container">
          <Typography variant="h5">Sign Up</Typography>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
