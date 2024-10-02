import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Alert, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  marginTop: 50,
  padding: 20,
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

const StyledButton = styled(Button)({
  marginTop: 20,
});

const LinkContainer = styled(Box)({
  marginTop: 20,
  textAlign: 'center',
});

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.msg || 'Registration successful!');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful registration
        }, 1000); // Optional delay to show success message
      } else {
        setError(result.msg || 'An error occurred.');
      }
    } catch (err) {
      setError('An error occurred while registering.');
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Box>
        <Typography variant="h4" align="center">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </StyledButton>
            </Grid>
          </Grid>
        </form>
        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginTop: 2 }}>{success}</Alert>}
        <LinkContainer>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" variant="body2">
              Login
            </Link>
          </Typography>
        </LinkContainer>
      </Box>
    </StyledContainer>
  );
}

export default Register;
