import React, { useState } from 'react';
import { Paper, Box, Typography, Stack, Button, IconButton, Collapse } from '@mui/material';
import { LuChevronDown, LuPinOff, LuPin, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from "../../pages/InterviewPrep/components/AiResponsePreview"

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLearnMore = () => {
    setIsExpanded(true);
    onLearnMore();
  };

  return (
    // Main container
    <Paper
      elevation={2}
      sx={{
        mb: 2,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'white',
        width: '100%', // <-- 1. THIS MAKES THE CARD FILL THE GRID CONTAINER
      }}
    >
      {/* --- Header Section (Clickable) --- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          p: 2.5,
          cursor: 'pointer',
        }}
        onClick={toggleExpand}
      >
        {/* Left Side: Q + Question */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            gap: 1.5,
            pr: 2,
            flexGrow: 1, // <-- 2. THIS MAKES THE BOX FILL THE CARD
            minWidth: 0, 
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'grey.500',
              lineHeight: 1.6,
              flexShrink: 0, 
            }}
          >
            Q
          </Typography>
          <Typography
            component="h3"
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'grey.800',
              wordBreak: 'break-word',
            }}
          >
            {question}
          </Typography>
        </Box>

        {/* Right Side: Action Buttons */}
        <Stack
          direction="row"
          spacing={0.5}
          onClick={(e) => e.stopPropagation()}
          sx={{ flexShrink: 0 }} 
        >
          {/* ... (Your buttons are correct) ... */}
          <IconButton
            size="small"
            onClick={onTogglePin}
            title={isPinned ? 'Unpin' : 'Pin'}
            sx={{ color: 'indigo.700' }}
          >
            {isPinned ? <LuPinOff size={16} /> : <LuPin size={16} />}
          </IconButton>

          <Button
            size="small"
            onClick={handleLearnMore}
            startIcon={<LuSparkles size={16} />}
            sx={{
              color: 'cyan.800',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '12px',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
              Learn More
            </Box>
          </Button>

          <IconButton
            size="small"
            onClick={toggleExpand}
            title={isExpanded ? 'Collapse' : 'Expand'}
            sx={{
              color: 'grey.500',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: (theme) => theme.transitions.create('transform', {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            <LuChevronDown size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* --- Collapsible Answer Section --- */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            bgcolor: 'grey.50',
            px: 2.5,
            py: 2,
            borderTop: '1px solid',
            borderColor: 'grey.200',
          }}
        >
         <AIResponsePreview content={answer} />
        </Box>
      </Collapse>
    </Paper>
  );
};

export default QuestionCard;