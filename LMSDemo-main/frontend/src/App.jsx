import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import Navbar from './components/Navbar';
import UserInfo from './components/UserInfo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from './context/AuthContext';
import CourseDetailsPage from './pages/CourseDetailsPage';
import Home from './pages/Home';
import Info from './components/Info';
import About from './pages/About';
import Blog from './pages/Blog';

function App() {
  return (
    <AuthProvider>
        <Router>
            <ToastContainer/>
            <Navbar/>
            <UserInfo/>
            <Routes>
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/register" element={  <RegisterPage />  } />
                <Route path="/courses" element={  <CoursesPage /> } />
                <Route path="/courses/:courseId" element={  <CourseDetailsPage /> } />
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/info" element={<Info/>}/>
               
            </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;