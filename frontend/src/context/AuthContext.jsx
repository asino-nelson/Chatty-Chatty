import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch(
      "https://chatty-backend-two.vercel.app/api/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        mode: "cors",
      }
    );

    const data = await response.json();
    console.log("Response data", data);

    if (response.status === 200) {
      console.log("Logged In ");
      navigate("/");
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      console.log(response.status);
      console.log("Something went wrong");
      alert("Login failed" + response.status);
    }
  };

  const registerUser = async (email, username, password, password2) => {
    const response = await fetch(
      "https://chatty-backend-two.vercel.app/api/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          password2,
        }),
        mode: "cors",
      }
    );

    const data2 = await response.json();

    if (response.status === 201) {
      navigate("/login");
    } else {
      console.log("Response data:", data2);
      console.log("Response status:", response.status);
      console.log(response.status);
      alert("Something went wrong" + response.status);
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const contextData = {
    user,
    setUser,
    authToken,
    setAuthToken,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authToken) {
      setUser(jwtDecode(authToken.access));
    }
    setLoading(false);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
