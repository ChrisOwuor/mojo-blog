import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  const [AuthTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("Authtokens");
    if (storedTokens) {
      return JSON.parse(storedTokens);
    }
    return null;
  });

  let [user, setUser] = useState(() =>
    AuthTokens ? jwtDecode(AuthTokens.access) : null
  );

  const [email, setEmail] = useState(null);
  const [password, setPass] = useState(null);
  const [load, setload] = useState(false);
  const [loginerror,setloginError] = useState(null)
  const body = {
    email: email,
    password: password,
  };

  let loginUser = async (e) => {
    e.preventDefault();
    setload(true)
    let response = await fetch("http://127.0.0.1:8000/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setTimeout(() => {
        setload(false);

      },2000);
      setUser(jwtDecode(data.access));
      localStorage.setItem("Authtokens", JSON.stringify(data));
      navigate("/");
    } else if (response.status === 401) {
      setTimeout(() => {
        setloginError("No active account found with the given credentials");

      },2000);
      setTimeout(() => {
         setload(false);
       }, 2000);
    }
  };

  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/auth/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: AuthTokens?.refresh }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("Authtokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (loading) {
        updateToken();
      }

      let four = 1000 * 60 * 4;

      let interval = setInterval(() => {
        if (AuthTokens) {
          updateToken();
        }
      }, four);

      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, AuthTokens, loading]);

  let logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("Authtokens");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  let contextData = {
    user: user,
    logoutUser: logoutUser,
    loginUser: loginUser,
    setEmail: setEmail,
    setPass: setPass,
    AuthTokens: AuthTokens,
    load: load,
    data: data,
    loadingPage: loadingPage,
    loginerror:loginerror
  };

  useEffect(() => {
    if (user?.user_id) {
      let getProfile = async () => {
        let response = await fetch(
          `http://localhost:8000/auth/user/${user.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(AuthTokens?.access),
            },
          }
        );
        let data = await response.json();

        if (response.status === 200) {
          setData(data);
          console.log(data);
          setLoadingPage(false);
        } else if (response.statusText === "Unauthorized") {
          setLoadingPage(false);
          logoutUser();
        }
      };

      getProfile();
    }
  }, [user?.user_id, AuthTokens?.access, logoutUser]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
