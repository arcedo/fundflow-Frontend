import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import Error404 from './pages/404';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recover from './pages/Recover';
import ResetPass from './pages/ResetPass';
import Verify from "./pages/Verify";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Help from './pages/Help';
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/reset/:code" element={<ResetPass />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/new/:type" element={<NewProject />} />
          <Route path="/profile/:userUrl" element={<Profile />} />
          <Route path="/projects/:projectUrl" element={<Project />} />
          <Route path="/projects/:projectUrl/edit" element={<Project editMode={true} />} />
          <Route path="/verifyEmail/:code" element={<Verify />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}