import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./features/filesSlice";
import folderReducer from "./features/foldersSlice";

export const store = configureStore({
  reducer: {
    files: filesReducer,
    folders: folderReducer,
  },
});

export default store;
