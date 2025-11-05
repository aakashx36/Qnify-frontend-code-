import React from "react";
import { Paper, Box, Container, Typography, Chip, Stack } from "@mui/material";
import { keyframes } from "@mui/system";
import { green, teal, blue } from "@mui/material/colors";

// --- Define Animations ---
const blob1 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.2);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
`;

const blob2 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-50px, 10px) scale(0.8);
  }
  66% {
    transform: translate(40px, 30px) scale(1.1);
  }
`;

const blob3 = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-15px, 20px) scale(1.1);
  }
  66% {
    transform: translate(20px, -15px) scale(0.9);
  }
`;

// --- Reusable Styles ---
const chipStyle = {
  bgcolor: "common.black",
  color: "common.white",
  fontSize: "10px",
  fontWeight: 600,
  height: "auto",
  "& .MuiChip-label": {
    padding: "4px 8px",
  },
  zIndex: 5,
};

const blobStyle = {
  position: "absolute",
  width: "250px",
  height: "250px",
  filter: "blur(80px)",
  opacity: 0.5,
  borderRadius: "50%",
};

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "white",
        pt: 2,
        pb: 2,
        minHeight: "140px",
      }}
    >
      {/* --- Animated Blob Container --- */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Blob 1 (Green) - Left */}
        <Box
          sx={{
            ...blobStyle,
            bgcolor: green[400],
            animation: `${blob1} 8s infinite ease-in-out`,
            left: { xs: "-80px", md: "-50px" },
            top: { xs: "0", md: "-20px" },
            width: { xs: "250px", md: "350px" },
            height: { xs: "250px", md: "350px" },
          }}
        />
        {/* Blob 2 (Teal) - Right */}
        <Box
          sx={{
            ...blobStyle,
            bgcolor: teal[400],
            animation: `${blob2} 10s infinite ease-in-out 2s`,
            right: { xs: "-80px", md: "-50px" },
            bottom: { xs: "0", md: "-20px" },
            width: { xs: "250px", md: "350px" },
            height: { xs: "250px", md: "350px" },
          }}
        />
        {/* Blob 3 (Light Blue) - Center */}
        <Box
          sx={{
            ...blobStyle,
            bgcolor: blue[300],
            animation: `${blob3} 9s infinite ease-in-out 1s`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
          }}
        />
      </Box>

      {/* --- Main Content --- */}
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
            pl: { xs: 2, md: 0 },
          }}
        >
          {/* Top Section: Role and Topics */}
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                {/* DYNAMIC: Using the 'role' prop */}
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight={500}
                  mb={0.5}
                >
                  {role}
                </Typography>
                {/* DYNAMIC: Using the 'topicsToFocus' prop */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mt: 0,
                    mb: 1,
                  }}
                >
                  {topicsToFocus}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Bottom Section: Stats Chips */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            mt={0}
            flexWrap="wrap"
          >
            {/* DYNAMIC: Chip 1 - Experience */}
            {experience && experience !== "--" && (
              <Chip
                label={`Experience: ${experience} ${
                  experience == 1 ? "Year" : "Years"
                }`}
                sx={chipStyle}
              />
            )}

            {/* DYNAMIC: Chip 2 - Questions */}
            {questions && questions !== "--" && (
              <Chip label={`${questions} Q&A`} sx={chipStyle} />
            )}

            {/* DYNAMIC: Chip 3 - Last Updated */}
            {lastUpdated && lastUpdated !== "--" && (
              <Chip label={`Last Updated: ${lastUpdated}`} sx={chipStyle} />
            )}
          </Stack>
        </Box>
      </Container>
    </Paper>
  );
};

export default RoleInfoHeader;
