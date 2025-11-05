import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/axiosInstance"; // Your configured Axios instance
import { API_PATHS } from "../utils/apiPaths"; // Your API paths

// 1. Create the Context
const UserContext = createContext();

// 2. Create the Provider Component
export const UserProvider = ({ children }) => {
  // State to hold user information (null if logged out)
  const [userInfo, setUserInfo] = useState(null);
  // State to track if the initial authentication check is complete
  const [loading, setLoading] = useState(true);

  // --- Login Function ---
  const login = async (email, password) => {
    const response = await api.post(API_PATHS.AUTH.LOGIN, { email, password });
    setUserInfo(response.data);
    return response.data; // Return user data on success
  };

  const signup = async (username, email, password, profileImageUrl) => {
    // 1. Base payload
    const payload = {
      fullName: username,
      email: email,
      password: password,
    };
    payload.profilepic = profileImageUrl;
    console.log(payload);

    const response = await api.post(API_PATHS.AUTH.REGISTER, payload);
    setUserInfo(response.data);
    return response.data;
  };

  // --- Logout Function ---
  const logout = async () => {
    try {
      await api.post(API_PATHS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      setUserInfo(null); // Clear user state in React
    }
  };

  // --- Check Auth Status on Initial Load ---
  useEffect(() => {
    const checkUserStatus = async () => {
      setLoading(true);
      try {
        const response = await api.get(API_PATHS.AUTH.GET_PROFILE);
        setUserInfo(response.data);
      } catch (error) {
        setUserInfo(null);
        if (error.response?.status !== 401) {
          console.error("Error checking user status:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []); // Empty array ensures this runs only once

  // 3. Value provided to consuming components (Corrected)
  const value = {
    userInfo,
    setUserInfo,
    login,
    signup, // Added signup function
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 4. Custom Hook for easy consumption
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Default export (optional, depends on your preference)
export default UserContext;
