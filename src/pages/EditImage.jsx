import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import GiphySelector from "react-giphy-selector";
import { useSelector } from "react-redux";

const EditImage = () => {
  const folder = useSelector((state) => state.folder);
  console.log(folder);
  const [image, setImage] = useState("https://via.placeholder.com/400"); // Placeholder image
  const [text, setText] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handlePreview = () => {
    if (image) {
      window.open(image, "_blank");
    }
  };

  const handleAddText = () => {
    if (text) {
      alert(`Text "${text}" added!`);
      setText("");
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    setEmojis((prevEmojis) => [...prevEmojis, emojiObject.emoji]);
    setShowEmojiPicker(false);
  };

  const handleGifSelect = (gif) => {
    setGifs((prevGifs) => [...prevGifs, gif.images.fixed_height.url]);
    setShowGifPicker(false);
  };

  const handleSave = () => {
    alert("Changes saved!");
    console.log({ image, text, emojis, gifs });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      {/* Image Placeholder */}
      <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt="Editable" className="max-w-md rounded-lg" />
        <div className="absolute top-4 left-4 text-white text-xl font-bold">
          {text}
        </div>
        <div className="absolute top-8 left-4 flex space-x-2">
          {emojis.map((emoji, index) => (
            <span key={index} className="text-3xl">
              {emoji}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {gifs.map((gif, index) => (
            <img
              key={index}
              src={gif}
              alt="GIF"
              className="w-16 h-16 rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        {/* Preview Button */}
        <button
          onClick={handlePreview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
        >
          <span>🔍</span>
          <span>Preview</span>
        </button>

        {/* Add Text */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border px-4 py-2 rounded"
          />
          <button
            onClick={handleAddText}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Text
          </button>
        </div>

        {/* Add Emojis */}
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2"
          >
            <span>😊</span>
            <span>Add Emoji</span>
          </button>
          {showEmojiPicker && (
            <div className="absolute z-10 bg-white shadow-lg rounded-lg">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {/* Add GIFs */}
        <div className="relative">
          <button
            onClick={() => setShowGifPicker(!showGifPicker)}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center space-x-2"
          >
            <span>🎥</span>
            <span>Add GIF</span>
          </button>
          {showGifPicker && (
            <div className="absolute z-10 bg-white shadow-lg rounded-lg w-72">
              <GiphySelector
                onEntrySelect={handleGifSelect}
                apiKey="YOUR_GIPHY_API_KEY" // Replace with your Giphy API key
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center space-x-2"
        >
          <span>💾</span>
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default EditImage;
