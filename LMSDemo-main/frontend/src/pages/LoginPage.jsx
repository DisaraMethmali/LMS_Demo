import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async (data) => {
    try {
      await login(data)
        navigate('/courses');
        toast.success('Successfully logged in!', {
            position: toast.POSITION.TOP_CENTER
        });
    } catch (error) {
        toast.error(error?.response?.data?.message || "Login Failed", {
            position: toast.POSITION.TOP_CENTER
        });
    }
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;