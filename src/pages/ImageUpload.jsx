import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addFiles, removeFile } from "../redux/features/filesSlice";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files); // Get files from Redux
  const [latestImage, setLatestImage] = useState(null);
  const [rotation, setRotation] = useState(0); // Rotation state
  const navigate = useNavigate();
  console.log(files);
  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files);
    dispatch(addFiles(uploadedFiles)); // Dispatch files to Redux
    const imageFile = uploadedFiles.find((file) =>
      file.type.startsWith("image/")
    );
    if (imageFile) {
      setLatestImage(URL.createObjectURL(imageFile));
      setRotation(0); // Reset rotation when a new image is uploaded
    }
  };

  const handleBrowse = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    dispatch(addFiles(uploadedFiles)); // Dispatch files to Redux
    const imageFile = uploadedFiles.find((file) =>
      file.type.startsWith("image/")
    );
    if (imageFile) {
      setLatestImage(URL.createObjectURL(imageFile));
      setRotation(0); // Reset rotation when a new image is uploaded
    }
  };

  const handleDelete = (fileName) => {
    dispatch(removeFile(fileName)); // Dispatch delete action
    if (
      latestImage &&
      files.find((file) => file.name === fileName)?.name === fileName
    ) {
      setLatestImage(null);
    }
  };

  const handlePreview = () => {
    if (latestImage) {
      window.open(latestImage, "_blank");
    }
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleProceedEditing = () => {
    navigate("/name-project");
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Left Side: Drag-and-Drop Area */}
      <div
        className="w-1/2 flex flex-col justify-center items-center bg-white m-8 p-8 rounded-lg shadow-lg relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {!latestImage ? (
          <div className="flex flex-col items-center">
            <IoCloudUploadOutline className="h-16 w-16 text-blue-500 mb-4" />
            <p className="text-gray-600 mb-4">Drag and Drop file</p>
            <p className="text-gray-600">or</p>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <img
              src={latestImage}
              alt="Latest Upload"
              className="max-w-xs max-h-64 rounded shadow-lg border"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>
        )}
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600 absolute bottom-4"
        >
          Browse
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleBrowse}
            className="hidden"
          />
        </label>

        {latestImage && (
          <div className="absolute bottom-16 flex space-x-4">
            <button
              onClick={handlePreview}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview
            </button>
            <button
              onClick={handleRotate}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Rotate
            </button>
            <button
              onClick={handleProceedEditing}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed Editing
            </button>
          </div>
        )}
      </div>

      {/* Right Side: Uploaded File List */}
      <div className="w-1/2 bg-white m-8 p-8 rounded-lg shadow-lg overflow-auto">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Uploaded Files</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file, index) => {
              const fileType = file.type.split("/")[1]?.toUpperCase() || "FILE";
              return (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold mr-4">
                      {fileType}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        {file.name}
                      </span>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(file.name)}
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
