import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    if (recoveredUser) {
      const token = localStorage.getItem('token');
      setUser(JSON.parse(recoveredUser))
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
    setLoading(false);

  }, [])

  const login = async (username, password) => {

    const response = await createSession(username, password);

    if (response.status === 200) {
      const token = response.data.access;
      const loggedUser = {
        username,
        token,
        "refresh": response.data.refresh
      };
      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('token', token);

      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(loggedUser);
      navigate("/dashboard");
    }

  };
  const logout = () => {
    setUser(null);
    api.defaults.headers.Authorization = null;
    localStorage.removeItem('user');
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};