import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const navigate = useNavigate();
    const { register } = useAuth();

  const handleRegister = async (data) => {
    try {
        await register(data)
       navigate('/login');
       toast.success('Successfully registered!', {
         position: toast.POSITION.TOP_CENTER
       });
    } catch (error) {
        toast.error(error?.response?.data?.message || "Registration Failed", {
            position: toast.POSITION.TOP_CENTER
        });
    }
  };
  return (
    <div>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;