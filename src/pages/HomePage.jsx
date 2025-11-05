import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Link,
  Avatar,
} from "@mui/material";

// Material-UI Icons
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import Modal from "../components/Modal.jsx";
import { grey } from "@mui/material/colors";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/Signup";
import ProfileInfoCard from "../components/cards/ProfiIeInfoCard.jsx";
import { useUser } from "../context/userContext.jsx";

// Helper component for global styles
const GlobalStyles = () => (
  <style>{`
    body {
        font-family: 'Inter, sans-serif';
        background-color: #f8fafc;
    }
    html {
        scroll-behavior: smooth;
    }
  `}</style>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [CurrentPage, setCurrentPage] = useState("login");
  const [OpenAuthModal, setOpenAuthModal] = useState(false);
  const { userInfo } = useUser();

  const handleCTA = () => {
    if (!userInfo) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <GlobalStyles />
     <AppBar
      position="sticky"
      component="header"
      sx={{ bgcolor: "white", color: "text.primary", boxShadow: 1 }}
    >
      <Container disableGutters maxWidth="lg">
        <Toolbar disableGutters sx={{ px: 2 }}>
          <Typography
            variant="h6"
            component="a"
            href="#"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Qnify
          </Typography>
          {userInfo ? (
            <ProfileInfoCard />
          ) : (
            // --- THIS IS THE IMPROVED SECTION ---
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* "Log In" as a simple text button */}
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setCurrentPage("login"); // Set which page to show
                  setOpenAuthModal(true);
                }}
              >
                Log In
              </Button>
              {/* "Sign Up" as a clear, contained button */}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => {
                  setCurrentPage("signup"); // <-- Assumes "signup" is the page key
                  setOpenAuthModal(true);
                }}
              >
                Sign Up
              </Button>
            </Box>
            // ------------------------------------
          )}
        </Toolbar>
      </Container>
    </AppBar> 
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            pt: { xs: 10, md: 14 }, // More top padding
            pb: { xs: 6, md: 10 }, // Balanced bottom padding
            textAlign: "center",
            mb: 0,
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 800,
                color: "grey.900",
              }}
            >
              Ace Your Next Interview
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 700, mx: "auto" }}
            >
              Your personal interview coach delivers questions tailored to your
              topic, along with instant AI feedback to get you hired with
              confidence.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ px: 4, py: 1.5 }}
              onClick={handleCTA}
            >
              Let's Start Your Journey
            </Button>
          </Container>
        </Box>

        {/* Features Section */}
        <Box component="section" sx={{ py: 8, bgcolor: "white" }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Why Choose Qnify?
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: "md", mx: "auto" }}
            >
              Everything you need to be fully prepared for any interview
              scenario.
            </Typography>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
            >
              {[
                {
                  icon: <PersonOutlineIcon color="primary" fontSize="large" />,
                  title: "Tailored Just for You",
                  desc: "Get interview questions and answers based on your role, experience, and focus area — no generic practice here.",
                },
                {
                  icon: <InsightsIcon color="primary" fontSize="large" />,
                  title: "Capture Your Insights",
                  desc: "Add personal questions and pin important ones to the top — making your learning more organized and impactful.",
                },
                {
                  icon: <SaveIcon color="primary" fontSize="large" />,
                  title: "Save, Organize and Revisit",
                  desc: "Save your interview sets, organize them neatly, and continue your preparation right where you left off.",
                },
                {
                  icon: <QueryBuilderIcon color="primary" fontSize="large" />,
                  title: "Learn at Your Own Pace",
                  desc: "Expand answers only when you're ready. Dive deeper into any concept instantly with AI-powered explanations.",
                },
              ].map((f, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={i}
                  sx={{ display: "flex" }}
                >
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Avatar
                        sx={{
                       
                          width: 64,
                          height: 64,
                          margin: "auto",
                          mb: 2,
                        }}
                      >
                        {f.icon}
                      </Avatar>
                      <Typography variant="h5" gutterBottom>
                        {f.title}
                      </Typography>
                      <Typography color="text.secondary">{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            bgcolor: "grey.900",
            color: "grey.100",
            pt: 8,
            pb: 4,
            mt: 8,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              {/* Brand Info */}
              <Grid item xs={12} md={5}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Qnify
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.400"
                  sx={{ lineHeight: 1.8 }}
                >
                  Qnify is a focused AI-based interview preparation platform.
                </Typography>
              </Grid>

              {/* About Section */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  About the Platform
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.400"
                  sx={{ lineHeight: 1.8 }}
                >
                  - Covers multiple interview topics and domains. <br />
                  - Focused on accurate and topic-specific content. <br />
                  - Updated regularly with the latest interview trends. <br />-
                  Designed for self-paced learning and preparation.
                </Typography>
              </Grid>

              {/* Contact Section */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Email: support@preppal.com
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Phone: +91 98765 43210
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Hours: Mon–Sat, 10 AM – 6 PM
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Modal
        isOpen={OpenAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {CurrentPage === "login" && <Login setCurrentPage={setCurrentPage} />}

          {CurrentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};
export default HomePage;
