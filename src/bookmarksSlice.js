import { createSlice } from "@reduxjs/toolkit";

const loadBookmarks = () => {
  const savedBookmarks = localStorage.getItem("bookmarkedQuotes");
  if (!savedBookmarks) {
    return [];
  }
  try {
    const parsedBookmarks = JSON.parse(savedBookmarks);
    if (
      parsedBookmarks === null ||
      parsedBookmarks === undefined ||
      !Array.isArray(parsedBookmarks)
    ) {
      console.warn(
        "LocalStorage 'bookmarkedQuotes' found but was not a valid array:",
        parsedBookmarks
      );
      return [];
    }
    return parsedBookmarks;
  } catch (error) {
    console.error("Error parsing 'bookmarkedQuotes' from localStorage:", error);
    return [];
  }
};

// const loadBookmarks = () => {
//   const savedBookmarks = localStorage.getItem("bookmarkedQuotes");

//   return savedBookmarks ? JSON.parse(savedBookmarks) : [];
// };

const saveBookmarks = (bookmarks) => {
  localStorage.setItem("bookmarkedQuotes", JSON.stringify(bookmarks));
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: loadBookmarks(),
  reducers: {
    addBookmark(state, action) {
      const quote = action.payload;

      if (!state.some((b) => b.id === quote.id)) {
        state.push(quote);
        saveBookmarks(state);
      }
    },
    removeBookmark(state, action) {
      const idToRemove = action.payload;
      const newState = state.filter((b) => b.id !== idToRemove);
      saveBookmarks(newState);
      return newState;
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
