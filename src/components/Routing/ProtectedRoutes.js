import React from "react";
import { Navigate } from "react-router-dom";
import { routerConstants } from "../../utils/constants";

const ProtectedRoutes = ({ auth, children }) => {
  if (auth) return children;
  return <Navigate to={routerConstants.LOGIN_ROUTE} replace />;
};

export default ProtectedRoutes;
