import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    
    <Box sx={{ p: 2.5 }}>
      
      <Typography variant="body2">
        {content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>

        <Button
          variant="contained" // A standard button style
          color="error"       // "Delete" implies a destructive (error) action
          size="small"        // Equivalent to "btn-small"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAlertContent;