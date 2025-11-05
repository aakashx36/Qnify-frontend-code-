import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Import for routing
import { AppBar, Toolbar, Container, Typography, Link } from "@mui/material";
import ProfileInfoCard from "../cards/ProfiIeInfoCard"; // Your custom component

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="default" // Uses a light background
      elevation={0}
      sx={{
        bgcolor: "background.paper", // Equivalent to bg-white
        borderBottom: 1, // Equivalent to border-b
        borderColor: "divider", // Equivalent to border-gray-200/50
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          // --- 'disableGutters' REMOVED ---
          // By removing this, the Toolbar's padding will match
          // the Container's padding, aligning your content.
          sx={{
            minHeight: "4rem", // Equivalent to h-16
            display: "flex",
            justifyContent: "space-between", // Equivalent to justify-between
            alignItems: "center", // Equivalent to items-center
          }}
        >
          {/* Link to dashboard */}
          <Link
            component={RouterLink} // Use React Router's Link
            to="/dashboard"
            underline="none" // Removes the link underline
            color="inherit"
          >
            {/* Qnify Text */}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700,
                background:
                  "linear-gradient(45deg, #6366F1 30%, #4F46E5 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Qnify
            </Typography>
          </Link>

          {/* Your custom component remains unchanged */}
          <ProfileInfoCard />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;