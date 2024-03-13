/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const ClientRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const userJSON = JSON.parse(user);

  if (!token && userJSON.role !== "Clien") {
    return <Navigate to="/auth/login" />;
  }
  
  return children;
};

export const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const userJSON = JSON.parse(user);

  if (!token && userJSON.role !== "Admin") {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
