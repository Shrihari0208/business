import { createSlice } from "@reduxjs/toolkit";

const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    folders: {}, // Object where keys are folder names, and values are arrays of files
  },
  reducers: {
    addFolder: (state, action) => {
      const { folderName, files } = action.payload;
      if (!state.folders[folderName]) {
        state.folders[folderName] = files; // Add a new folder with the given files
      } else {
        throw new Error("Folder already exists!");
      }
    },
    addFilesToFolder: (state, action) => {
      const { folderName, files } = action.payload;
      if (state.folders[folderName]) {
        state.folders[folderName] = [...state.folders[folderName], ...files];
      } else {
        throw new Error("Folder does not exist!");
      }
    },
    renameFolder: (state, action) => {
      const { oldName, newName } = action.payload;
      if (state.folders[oldName]) {
        state.folders[newName] = state.folders[oldName];
        delete state.folders[oldName];
      } else {
        throw new Error("Folder does not exist!");
      }
    },
    deleteFolder: (state, action) => {
      const { folderName } = action.payload;
      if (state.folders[folderName]) {
        delete state.folders[folderName];
      } else {
        throw new Error("Folder does not exist!");
      }
    },
  },
});

export const { addFolder, addFilesToFolder, renameFolder, deleteFolder } =
  foldersSlice.actions;

export default foldersSlice.reducer;
