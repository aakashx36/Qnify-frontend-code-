import { API_PATHS } from "../utils/apiPaths"; // <-- Adjust this path if needed
import axios from "axios";
// 1. Import your API paths
const api = axios.create({
  baseURL: "https://qnify-backend-code.onrender.com/", // Or http://localhost:8000/api if you changed it
  withCredentials: true,
});

// ... (your request interceptor is fine) ...
api.interceptors.request.use(
  (config) => {
    console.log(`Sending request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- START: CORRECTED RESPONSE INTERCEPTOR ---
api.interceptors.response.use(
  (response) => {
    // If the response is 2xx, just return it
    return response;
  },
  (error) => {
    if (error.response) {
      const failedUrl = error.config.url;
      // --- ADD THESE LOGS ---
      console.log("--- DEBUGGING INTERCEPTOR ---");
      console.log("Value 1 (failedUrl):", failedUrl);
      console.log(
        "Value 2 (API_PATHS.AUTH.GET_PROFILE):",
        API_PATHS.AUTH.GET_PROFILE
      );
      console.log("Value 1 (failedUrl):", failedUrl);
      console.log("Value 2 (API_PATHS.AUTH.LOGIN):", API_PATHS.AUTH.LOGIN);
      console.log(
        "Value 3 (API_PATHS.AUTH.GET_PROFILE):",
        API_PATHS.AUTH.GET_PROFILE
      );
      console.log(
        "Login check (endsWith):",
        failedUrl.endsWith(API_PATHS.AUTH.LOGIN)
      );
      console.log(
        "Profile check (endsWith):",
        failedUrl.endsWith(API_PATHS.AUTH.GET_PROFILE)
      );
      console.log("-------------------------------");
      console.log(
        "Do they match? (endsWith):",
        failedUrl.endsWith(API_PATHS.AUTH.GET_PROFILE)
      );
      console.log("-------------------------------");

      // Specifically check for 401 Unauthorized
      if (error.response.status === 401) {
        console.log(
          "INTERCEPTOR CAUGHT ERROR:",
          error.response.status,
          error.config.url
        );
        // 2. Check if the failed request was the login or profile check
        // If it was, DON'T redirect. Let the component handle the error.
        if (
          failedUrl.endsWith(API_PATHS.AUTH.LOGIN) ||
          failedUrl.endsWith(API_PATHS.AUTH.GET_PROFILE)
        ) {
          // Just reject the promise so the component's .catch() block runs
          return Promise.reject(error);
        }

        // 3. For any OTHER 401, the user's session expired.
        // Redirect to the page where the login modal lives (e.g., the homepage).
        console.log("Session expired (401). Redirecting to home.");
        window.location.href = "/"; // <-- Redirect to home (or wherever your modal is)
      }
    } else if (error.request) {
      // ... (your network error handling is fine) ...
      console.error("Network Error:", error.message);
    } else {
      console.error("Axios Setup Error:", error.message);
    }

    // Reject the promise for all other errors
    return Promise.reject(error);
  }
);
// --- END: CORRECTED RESPONSE INTERCEPTOR ---

export default api;
