import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({ value, onChange, label, placeholder, type, ...props }) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!ShowPassword);
  };

  return (
    <TextField
      type={type === "password" ? (ShowPassword ? "text" : "password") : type}
      label={label}
      sx={{
        "& .MuiOutlinedInput-root": {
          // --- THIS IS THE FIX ---
          // This applies the background color to the
          // *entire* field, including the icon's container.
          bgcolor: "rgba(240, 245, 255, 0.9)", // Your light blue color

          // Your border styles
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.primary",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.primary",
          },
        },
      }}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePassword}
                edge="end"
              >
                {ShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

export default Input;
