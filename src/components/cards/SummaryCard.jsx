import React from "react";

// --- MUI Imports ---
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material"; // MUI icon for trash

// Helper function to get initials from the role
const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2); // Get first two initials
};

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  // Handle the delete click and stop it from triggering the Card's onSelect
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent Card's onSelect from firing
    onDelete();
  };

  return (
    <Card
      elevation={2}
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6, // Increase shadow on hover
          transform: "translateY(-2px)", // Slight lift effect
        },
        transition: "all 0.2s ease-in-out",
        height: "100%", // Ensure cards in a grid are the same height
      }}
      onClick={onSelect}
    >
      {/* 1. Top Color Bar */}
      <Box sx={{ height: "6px", background: colors.bgcolor }} />

      {/* 2. Main Content Area */}
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {/* 3. Header Section (Avatar + Title + Delete) */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          {/* Avatar (using role for initials) */}
          <Avatar
            sx={{
              background: colors.bgcolor,
              color: colors.color || "#fff", // Use provided text color or default to white
              fontWeight: 600,
              width: 48,
              height: 48,
            }}
          >
            {getInitials(role)}
          </Avatar>

          {/* Title and Subtitle */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {role}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {topicsToFocus}
            </Typography>
          </Box>

          {/* Delete Button */}
          <IconButton onClick={handleDelete} size="small" aria-label="delete">
            <DeleteOutline />
          </IconButton>
        </Box>

        {/* 4. Description (Moved up to match preview) */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, flexGrow: 1 }}
        >
          {description || "No description provided."}
        </Typography>

        {/* 5. Stats Bar (at the bottom) */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
          <Chip
            variant="outlined"
            size="small"
            label={`${experience} ${experience == 1 ? "Year" : "Years"}`}
          />
          <Chip variant="outlined" size="small" label={`${questions} Q&A`} />
          {lastUpdated && (
            <Chip variant="outlined" size="small" label={`${lastUpdated}`} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
