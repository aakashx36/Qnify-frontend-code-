import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Link, Button, Typography } from "@mui/material";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import { useUser } from "../../context/userContext.jsx"; // Adjust if UserContext.js is elsewhere
import { API_PATHS } from "../../utils/apiPaths.js"; // Adjust if apiPaths.js is elsewhere

const Login = ({ setCurrentPage }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useUser(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!Password) {
      setError("Please enter the password");
      return;
    }

    // Login API Call
    try {
      // 6. Call the login function
      await login(Email, Password);

      // 7. If successful, navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      // If login fails, the 'login' function will throw an error
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    // This Box is the modal content container
    <Box
      sx={{
        // Removed width, as the modal itself should control this.
        p: { xs: 2, md: 3 }, // Slightly reduced padding for a tighter look
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // Removed shadow/border props, as the Modal component handles this.
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: "600", color: "text.primary" }}
      >
        Welcome Back
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, mb: 1 }} // Reduced bottom margin
      >
        Please enter your details to log in
      </Typography>

      {/**
       * --- MISTAKE 4 (FIXED) ---
       * Replaced <form> with <Box component="form">
       * This is the standard MUI way to make a form container.
       */}
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
        <Input
          value={Email} // Fixed: uses lowercase 'email'
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email" // Changed type to 'email' for better validation
        />

        <Input
          value={Password} // Fixed: uses lowercase 'password'
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {/* --- ADDED: Error Display --- */}
        {error && (
          <Typography
            color="error"
            variant="caption"
            sx={{ display: "block", textAlign: "center", mt: 1 }}
          >
            {error}
          </Typography>
        )}

        {/* This Box groups the button and signup link */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mb: 2, py: 1.2, fontWeight: "bold" }} // Added padding and weight
          >
            LOGIN
          </Button>

          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link
              component="button"
              type="button" // Important for accessibility
              variant="body2"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
