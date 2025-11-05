import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "./CustomTheme.jsx";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={CustomTheme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
