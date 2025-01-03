import React, { useState } from 'react';
import { Typography, Box, Button, TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const signInSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", data);
      localStorage.setItem("token", response.data.access_token);
      console.log("Sign-in successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '300px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                fullWidth
                size="small"
                type="email"
                placeholder="Email"
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                error={!!errors.password}
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </InputAdornment>
                  ),
                }}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>

          <Typography>
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default SignIn;
