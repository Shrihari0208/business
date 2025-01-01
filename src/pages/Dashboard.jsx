import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFolder,
  renameFolder,
  deleteFolder,
} from "../redux/features/foldersSlice";
import { FiEdit2 } from "react-icons/fi"; // Rename icon
import { AiOutlineDelete } from "react-icons/ai"; // Delete icon
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesModalOpen, setFilesModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [renamingFolder, setRenamingFolder] = useState(null); // Folder being renamed
  const [renameInput, setRenameInput] = useState("");
  const [currentFolder, setCurrentFolder] = useState(""); // Folder being viewed
  const files = useSelector((state) => state.files.files); // Files passed from the previous page
  const folders = useSelector((state) => state.folders.folders); // Existing folders in Redux
  const navigate = useNavigate();

  // Automatically open modal if no folders exist and files are present
  useEffect(() => {
    if (Object.keys(folders).length === 0 && files.length > 0) {
      setIsModalOpen(true);
    }
  }, [folders, files]);

  const handleSaveFolder = () => {
    if (!newFolderName.trim()) {
      alert("Folder name cannot be empty!");
      return;
    }

    if (folders[newFolderName.trim()]) {
      alert("Folder name already exists!");
      return;
    }

    // Create folder with the provided name and store files in it
    dispatch(addFolder({ folderName: newFolderName.trim(), files }));
    setNewFolderName("");
    setIsModalOpen(false);
  };

  const handleRename = (folderName) => {
    if (!renameInput.trim()) {
      alert("Folder name cannot be empty!");
      return;
    }

    if (folders[renameInput.trim()]) {
      alert("Folder name already exists!");
      return;
    }

    dispatch(
      renameFolder({ oldName: folderName, newName: renameInput.trim() })
    );
    setRenamingFolder(null);
    setRenameInput("");
  };

  const handleDelete = (folderName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${folderName}"?`
    );
    if (confirmDelete) {
      dispatch(deleteFolder({ folderName }));
    }
  };

  const handleSeeFiles = (folderName) => {
    setCurrentFolder(folderName);
    setFilesModalOpen(true);
  };

  const handleDeleteFile = (fileName) => {
    const updatedFiles = folders[currentFolder].filter(
      (file) => file.name !== fileName
    );
    dispatch(
      addFolder({
        folderName: currentFolder,
        files: updatedFiles,
      })
    );
  };

  const handleProceedEditing = () => {
    navigate("/image-edit");
    // Implement navigation to editing page or further actions
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Dashboard</h1>

        {Object.keys(folders).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(folders).map(([folderName, folderFiles], index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
              >
                {renamingFolder === folderName ? (
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="text"
                      placeholder="New folder name"
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                    <button
                      onClick={() => handleRename(folderName)}
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {folderName}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <FiEdit2
                        onClick={() => {
                          setRenamingFolder(folderName);
                          setRenameInput(folderName);
                        }}
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                      />
                      <AiOutlineDelete
                        onClick={() => handleDelete(folderName)}
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-600">
                  {folderFiles.length} file{folderFiles.length !== 1 && "s"}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleSeeFiles(folderName)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    See Files
                  </button>
                  <button
                    onClick={() => handleProceedEditing(folderName)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Proceed Editing
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No folders created yet.</p>
        )}
      </div>

      {/* Modal for Naming Folder */}
      <Modal
        isOpen={isModalOpen}
        title="Name Your Project"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSaveFolder}
        confirmText="Save"
      >
        <input
          type="text"
          placeholder="Enter folder name"
          className="border border-gray-300 rounded w-full px-4 py-2"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>

      {/* Modal for Viewing Files */}
      <Modal
        isOpen={filesModalOpen}
        title={`Files in ${currentFolder}`}
        onClose={() => setFilesModalOpen(false)}
      >
        <div className="grid grid-cols-2 gap-4">
          {folders[currentFolder]?.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-gray-200 p-2 rounded"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-16 w-16 object-cover rounded mb-2"
              />
              <p className="text-xs text-gray-700 truncate w-16">{file.name}</p>
              <button
                onClick={() => handleDeleteFile(file.name)}
                className="text-red-500 text-sm hover:text-red-600 mt-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
