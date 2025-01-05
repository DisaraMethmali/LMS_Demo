import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Added loading state


  useEffect(() => {
    const fetchUser = async () => {
        if (isLoggedIn) {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                console.log('error fetching user', error);
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setUser(null);
            }
        }
      setLoading(false);
    };
    fetchUser();
  }, [isLoggedIn]);

  const login = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.access_token);
      setIsLoggedIn(true);
      setUser(response.data.user);
      return true;
    } catch (error) {
      throw error; // Propagate the error for the component to handle
    }
  };

  const register = async (data) => {
      try {
          await api.post('/auth/register', data);
          return true;
      } catch(error){
          throw error
      }
  }


  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };


  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// Custom hook to use the auth context
const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthProvider, useAuth };