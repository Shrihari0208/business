import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleVideo = () => {
    navigate("/video-upload");
  };

  const handleImage = () => {
    navigate("/image-upload");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Half */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-6">Want to add text to...</h2>
        <div className="flex flex-col space-y-4 w-1/2">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            onClick={handleImage}
          >
            Image
          </button>
          <button
            className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
            onClick={handleVideo}
          >
            Video
          </button>
        </div>
      </div>

      {/* Right Half */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200 p-8">
        <div className="max-w-md text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            What does our app do?
          </h3>
          <p className="text-gray-700">
            Our app allows you to enhance your images and videos by adding text,
            emojis, GIFs, and more! Whether you're creating memes, marketing
            content, or just having fun, our intuitive tools make it simple and
            easy to create stunning results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
