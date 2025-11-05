import React from "react";
import { useUser } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { amber } from "@mui/material/colors"; // To get the amber color
import { Box, Typography, Avatar, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
const ProfileInfoCard = () => {
  const { userInfo, logout, setUserInfo } = useUser();
  const navigate = useNavigate();
  // Handle case where user might already be logged out (optional check)
  if (!userInfo) {
    return null;
  }
  const handlelogout = async () => {
    await logout(); // Call the function from your context
    setUserInfo(null);
    navigate("/"); // Navigate to the homepage after logout
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Replaces <img className="w-11 h-11 ... rounded-full"> */}
        <Avatar
          src={userInfo.profilepic}
          alt={userInfo.name || ""}
          sx={{
            width: 44, // Tailwind w-11
            height: 44, // Tailwind h-11
            mr: 1.5, // Tailwind mr-3
            bgcolor: "grey.300", // Fallback color
          }}
        >
          <PersonIcon />
          {/* 2. Shows this if src fails (instead of initials) */}
        </Avatar>
        {/* Replaces the inner <div> container */}
        <Box>
          {/* Replaces the <div> for the name */}
          <Typography
            variant="subtitle2" // Close to 15px
            sx={{
              fontWeight: "bold", // font-bold
              lineHeight: 1.2, // leading-3 (12px) is very tight
            }}
          >
            {userInfo.fullName}
          </Typography>

          {/* Replaces the <button> */}
          <Button
            variant="text"
            size="small" // text-sm
            onClick={handlelogout}
            sx={{
              color: amber[600], // text-amber-600
              fontWeight: 600, // font-semibold
              p: 0.2, // Make padding smaller
              minWidth: "auto", // Allow button to be just as wide as text
              "&:hover": {
                backgroundColor: "transparent", // Optional: mimic Tailwind hover
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProfileInfoCard;
