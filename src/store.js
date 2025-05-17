import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import bookmarksReducer from "./bookmarksSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    bookmarks: bookmarksReducer,
  },
});

export default store;
