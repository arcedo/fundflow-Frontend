import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recover from './pages/Recover';
import Verify from "./pages/Verify";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Help from './pages/Help';
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
    <Router>
    <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/recover" element={<Recover/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/verify/:userId" element={<Verify/>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
    </>
  );
}