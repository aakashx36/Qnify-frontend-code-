import React, { useContext } from "react";
import { useUser } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { userInfo } = useUser();
  return (
    <div>
      <Navbar />
      {userInfo && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
