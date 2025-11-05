import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import api from "../../utils/axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
// 1. Import your custom Input component
import Input from "../../components/Inputs/Input.jsx"; // Adjust path if needed

// Material-UI Imports
import { Box, Typography, Stack, FormHelperText } from "@mui/material";
import { Button } from "@mui/material"; // For the submit button

const CreateSessionForm = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    // Validation
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await api.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data;

      const response = await api.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, width: { xs: "90vw", md: 500 } }}>
      <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
        Start a New Interview Journey
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </Typography>

      <Box component="form" onSubmit={handleCreateSession}>
        {/* Using <Stack> for vertical layout. Spacing is handled
            by the "margin='normal'" prop in your Input component. */}
        <Stack>
          {/* 2. Using your custom Input component */}
          <Input
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            label="Target Role"
            placeholder="e.g., Frontend Developer, UI/UX Designer, etc."
            type="text"
          />
          <Input
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            label="Years of Experience"
            placeholder="e.g., 1, 3, 5+ years"
            type="number"
          />
          <Input
            value={formData.topicsToFocus}
            onChange={(e) => handleChange("topicsToFocus", e.target.value)}
            label="Topics to Focus On"
            placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
            type="text"
          />
          <Input
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            label="Description (Optional)"
            placeholder="Any specific goals or notes for this session"
            type="text"
          />

          {error && (
            <FormHelperText
              error
              sx={{ textAlign: "center", fontSize: "0.875rem", mt: 1 }}
            >
              {error}
            </FormHelperText>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            fullWidth
            sx={{
              mt: 2,
              height: 48,
            }}
          >
            {/* This is the fix */}
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Session"
            )}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateSessionForm;
