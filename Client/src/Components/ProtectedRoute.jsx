import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const parseJwt = (token) => {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const token = useSelector((state) => state.user.token);
  console.log("Token:", token); // Debugging: Check if token is being retrieved correctly

  const parsedToken = parseJwt(token);
  console.log("Parsed Token:", parsedToken); // Debugging: Check the parsed token payload

  const role = parsedToken ? parsedToken.tokenrole : null;
  console.log("Role:", role); // Debugging: Check if the role is being correctly identified

  return role === "admin" ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
