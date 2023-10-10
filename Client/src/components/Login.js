import React, { useState } from 'react';
import bgForms from '../images/bg-forms.jpg';
import '../assets/AuthForm.css';
import { Button, Container, CssBaseline, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { login } from '../services/operationsUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for the login button

  const handleLogin = async () => {
    try {
      const user = {
        email: email,
        password: password,
      };
      // Call the login service to authenticate the user

      const response = await login(user);

      if (response && response.token) {
        console.log('Login successful');
        toast.success('Login successful! Welcome back!', {
          position: toast.POSITION.BOTTOM_LEFT,
          theme: "colored",
        });
       
        navigate('/places');
      } else {
        console.error('Unexpected response from the server');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Adresse email or password incorrect ! ', {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
      });
    }
  };

  return (
    <div className="auth-form" style={{ backgroundImage: `url(${bgForms})` }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="form-container">
          <Typography variant="h5">Welcome Back</Typography>
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
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
