import React from "react";
import { Modal as MuiModal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Style for the modal content box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto", // Let the content define the width
  bgcolor: "background.paper",
  borderRadius: 3, // Matches your Signup form's border radius
  boxShadow: 24,
  outline: "none",
  overflow: "hidden", // Ensures content respects the border radius
};

/**
 * A reusable Modal component built with Material-UI.
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      // This provides the semi-transparent black backdrop
    >
      <Box sx={style}>
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 10, // Ensure it's above the content
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Modal Body */}
        {/* The children (Login or Signup component) will provide their own padding */}
        <div>{children}</div>
      </Box>
    </MuiModal>
  );
};

export default Modal;
