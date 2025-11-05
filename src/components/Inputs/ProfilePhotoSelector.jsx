import React, { useRef, useState } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// --- Styled Components ---

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledAvatar = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `2px dashed ${theme.palette.divider}`,
  overflow: "hidden",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
}));

const SmallIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// --- Component ---

const ProfileSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  // Local state fallback in case parent doesn't provide preview/setPreview
  const [localPreview, setLocalPreview] = useState(null);

  const displayPreview = preview !== undefined ? preview : localPreview;
  const setDisplayPreview =
    setPreview !== undefined ? setPreview : setLocalPreview;

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Revoke old URL if it exists to prevent memory leaks
      if (displayPreview) {
        URL.revokeObjectURL(displayPreview);
      }

      setImage(file);
      const newPreview = URL.createObjectURL(file);
      setDisplayPreview(newPreview);
    }
  };

  const handleRemoveImage = () => {
    // Revoke the object URL to prevent memory leaks
    if (displayPreview) {
      URL.revokeObjectURL(displayPreview);
    }

    setImage(null);
    setDisplayPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
      />

      {image ? (
        // --- STATE: IMAGE SELECTED ---
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <SmallIconButton
              color="error"
              aria-label="remove picture"
              onClick={handleRemoveImage}
            >
              <LuTrash size={18} />
            </SmallIconButton>
          }
        >
          <StyledAvatar>
            <img
              src={displayPreview}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </StyledAvatar>
        </Badge>
      ) : (
        // --- STATE: NO IMAGE (Default) ---
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <SmallIconButton
              color="primary"
              aria-label="upload picture"
              onClick={onChooseFile}
            >
              <LuUpload size={18} />
            </SmallIconButton>
          }
        >
          <StyledAvatar>
            <LuUser size={50} style={{ color: "#aaa" }} />
          </StyledAvatar>
        </Badge>
      )}
    </Box>
  );
};

export default ProfileSelector;
