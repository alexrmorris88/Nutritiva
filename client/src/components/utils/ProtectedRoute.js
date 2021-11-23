import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAdmin === true && user.roles !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      {loading === false &&
        (isAuthenticated ? <Outlet /> : <Navigate to="/login" />)}
    </Fragment>
  );
};

export default ProtectedRoute;
