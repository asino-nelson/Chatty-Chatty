import { useContext } from "react";
import PropTypes from "prop-types"; 
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
