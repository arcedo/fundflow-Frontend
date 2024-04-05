import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recover from './pages/Recover';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/recover" element={<Recover/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}