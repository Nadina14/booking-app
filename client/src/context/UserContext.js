import { createContext, useContext, useState } from "react";
import storage from "../hooks/storage.js";
import axios from "axios";

axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = storage('user', null); 

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    const message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : "Invalid email or password";
    setError(message);
  };

  const signUp = async (username, email, password) => {
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const body = { username, email, password };
      const { data } = await axios.post(`/authentication/signup`, body);
      localStorage.setItem('token', data.token); 
      setUser(data.user); 
    } catch (error) {
      console.error(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email, password) => {
    if (loading) return;
  
    setError(null);
    setLoading(true);
  
    try {
      const body = { email, password };
      const { data } = await axios.post(`/authentication/login`, body);
      localStorage.setItem('token', data.token); 
      setUser(data.user); 
    } catch (error) {
      console.error(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null); 
  };

  const value = {
    user,
    signUp,
    logIn,
    logOut,
    error,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Use UserProvider.");
  }
  return context;
};