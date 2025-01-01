import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
  },
  reducers: {
    addFiles: (state, action) => {
      state.files = [...state.files, ...action.payload];
    },
    removeFile: (state, action) => {
      state.files = state.files.filter((file) => file.name !== action.payload);
    },
    clearFiles: (state) => {
      state.files = [];
    },
  },
});

export const { addFiles, removeFile, clearFiles } = filesSlice.actions;
export default filesSlice.reducer;
