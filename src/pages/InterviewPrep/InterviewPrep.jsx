import React, { useState, useEffect } from "react";
import { Box,Button, Drawer, Typography, IconButton, Alert, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // A standard close icon
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import RoleInfoReader from "./components/RoleInfoReader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import QuestionCard from "../../components/cards/QuestionCard"
import api from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AiResponsePreview from "./components/AiResponsePreview"
import { Container, Grid } from '@mui/material';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await api.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await api.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Question - With Optimistic Swap (Corrected)
  const toggleQuestionPinStatus = async (questionId) => {
    
    setSessionData(prevData => {
      // 1. Map to a new array, toggling the specific question
      const mappedQuestions = prevData.questions.map(q =>
        q._id === questionId
          ? { ...q, isPinned: !q.isPinned } // New object for the toggled item
          : q // Same object for all others
      );

      // 2. Create a NEW sorted array
      //    We use [...mappedQuestions] to create a new copy *before* sorting
      const sortedQuestions = [...mappedQuestions].sort((a, b) => {
        // Pinned (true) items go to the top
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      });

      // 3. Return the new state
      return {
        ...prevData,
        questions: sortedQuestions,
      };
    });

    // 4. Send the API request in the background
    try {
      await api.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      // API call sent successfully.
      
    } catch (error) {
      console.error("Error updating pin status:", error);
      
      // 5. Rollback: If it fails, just re-fetch the original state.
      // (Rolling back an optimistic sort is complex, so a re-fetch is safest)
      fetchSessionDetailsById(); 
    }
  };
  
  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      setErrorMsg(""); // Clear previous errors

      // Call AI API to generate questions
      const aiResponse = await api.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10, // As seen in your screenshot
        }
      );

      // Should be array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await api.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions
        }
      );

      if (response.data) {
        // toast.success("Added More Q&A!!"); // <-- This line is removed
        fetchSessionDetailsById(); // Refresh the data
      }
    } catch (error) {
      console.error("Error adding more questions:", error);
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);

  // --- LOGIC REMOVED ---
  // We no longer need to check for isLargeList
  // -----------------------

  return (
    <DashboardLayout>
      <RoleInfoReader
        role={sessionData?.role || "--"}
        topicsToFocus={sessionData?.topicsToFocus || "--"}
        experience={sessionData?.experience || "--"}
        questions={sessionData?.questions?.length || "--"}
        description={sessionData?.description || "--"}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : "--"
        }
      />
      <Container sx={{ 
        pt: 4, 
        pb: 4, 
        px: { xs: 4, md: 0 } 
      }}>
        <Typography
          variant="h6" // 'text-lg' is closest to h6
          component="h2"
          fontWeight={600} // 'font-semibold'
          color="text.primary" // 'color-black'
        >
          Interview Q & A
        </Typography>

        <Grid
          container
          spacing={4} // 'gap-4'
          sx={{ mt: 5, mb: 10 }} // 'mt-5 mb-10'
        >
          {/* This is the main column for questions */}
          <Grid
            item
            xs={12} // 'col-span-12'
            // --- LOGIC REVERTED ---
            // This is your original logic. It is always md={8}
            // when the drawer is closed, for a consistent layout.
            md={openLeanMoreDrawer ? 7 : 8}
            // ------------------------
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout // This is the key prop that animates position changes
                    layoutId={`question-${data._id || index}`} // Helps framer track
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() => {
                        generateConceptExplanation(data.question);
                      }}
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button 
                  variant="outlined" 
                  onClick={uploadMoreQuestions}
                >
                  Load More Questions
                </Button>
              </Box>
          </Grid>
          
          {/* NOTE: You will likely need a second Grid item here 
            to hold the "Learn More" drawer's content, for example:
          */}
          {/*
          {openLeanMoreDrawer && (
            <Grid item xs={12} md={5}>
              { ... Your drawer content ... }
            </Grid>
          )}
          */}
     
        </Grid>
      </Container>
      
      {/* --- ADDED DRAWER COMPONENT --- */}
      <Drawer
        anchor="right"
        open={openLeanMoreDrawer}
        onClose={() => setOpenLeanMoreDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: { xs: '100%', md: '500px' },
            boxSizing: 'border-box',
            p: 2.5,
          },
        }}
      >
        {/* --- Drawer Header --- */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {/* FIXED LOGIC: Show title always, or a default */}
            {explanation?.title || 'Concept Explanation'}
          </Typography>
          <IconButton onClick={() => setOpenLeanMoreDrawer(false)} sx={{ p: 0.5 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* --- Drawer Content --- */}

        {/* Error Message */}
        {errorMsg && (
          <Alert
            severity="warning"
            icon={<LuCircleAlert />}
            sx={{ mb: 2, fontSize: '0.875rem', fontWeight: 500, alignItems: 'center' }}
          >
            {errorMsg}
          </Alert>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* AI Response */}
        {/* FIXED LOGIC: Show *after* loading */}
        {!isLoading && explanation && (
          <AiResponsePreview content={explanation?.explanation} />
        )}
      </Drawer>
    </DashboardLayout>
  );
};

export default InterviewPrep;
