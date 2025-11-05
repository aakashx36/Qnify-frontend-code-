import React from "react";
import { useState } from "react";
import { Box, Typography, Button, Link, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { validateEmail } from "../../utils/helper.js";
// 1. IMPORT THE ProfileSelector COMPONENT
// (Assuming it's in the same 'Inputs' folder)
import ProfileSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";
import { useUser } from "../../context/userContext.jsx";
import uploadImage from "../../utils/uploadImage"; // Import your image upload function

const SignUp = ({ setCurrentPage }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FullName, setFullName] = useState("");
  const [Profilepic, setProfilePic] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useUser();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!Password) {
      setError("Please enter the password");
      return;
    }

    if (!FullName) {
      setError("Pleade enter your FulllName ");
    }
    setError("");

    let profileImageUrl = ""; // Default to empty string
    // Login API Call
    try {
      if (Profilepic) {
        const imageUploadRes = await uploadImage(Profilepic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }
      console.log(profileImageUrl);
      try {
        await signup(FullName, Email, Password, profileImageUrl);

        // 7. If successful, navigate to the dashboard
        navigate("/dashboard");
      } catch {}
    } catch (error) {
      // 2. If it succeeds, navigate to the dashboard
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    // 4. (FOR TESTING) YOU CAN NOW ACCESS THE FILE
    // The 'ProfilePic' state now holds the actual file object
    console.log("File to upload:", Profilepic);
    console.log("Email:", Email);

    // ... your real sign-up logic would go here
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: "90vw", sm: 450, md: 500 },
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 6,
          borderRadius: 3,
          bgcolor: "background.paper",
          mx: "auto",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "700",
            color: "text.primary",
            mb: 1,
          }}
        >
          Create an Account
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Join us today by entering your details below.
        </Typography>

        <form
          onSubmit={handleSignUp}
          style={{ width: "100%" }}
          encype="multipart/form-data"
        >
          {/* 3. ADD THE ProfileSelector COMPONENT */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ProfileSelector image={Profilepic} setImage={setProfilePic} />
          </Box>

          {/* (Rest of your form inputs) */}
          <Input
            value={FullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            sx={{ mb: 2 }}
          />
          <Input
            value={Email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            sx={{ mb: 2 }}
          />
          <Input
            value={Password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            sx={{ mb: 3 }}
          />
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            sx={{
              mb: 2,
              py: 1.5,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            SIGN UP
          </Button>
          <Stack
            direction="row"
            spacing={0.5}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" color="text.secondary">
              Already an account?
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => setCurrentPage("login")}
              sx={{ fontWeight: "bold" }}
            >
              Log In
            </Link>
          </Stack>
        </form>
      </Box>
    </>
  );
};
export default SignUp;
