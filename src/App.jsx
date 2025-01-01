import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import VideoUpload from "./pages/VideoUpload";
import EditImage from "./pages/EditImage";
import EditVideo from "./pages/EditVideo";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-upload" element={<ImageUpload />} />
        <Route path="/video-upload" element={<VideoUpload />} />
        <Route path="/image-edit" element={<EditImage />} />
        <Route path="/edit-video" element={<EditVideo />} />
        <Route path="/name-project" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
