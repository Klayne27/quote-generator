import { createSlice } from "@reduxjs/toolkit";

const loadBookmarks = () => {
  const savedBookmarks = localStorage.getItem("bookmarkedQuotes");
  if (!savedBookmarks) {
    // If no item or an empty string was saved
    return [];
  }
  try {
    const parsedBookmarks = JSON.parse(savedBookmarks);
    // Check if parsing resulted in null, undefined, or something not an array
    if (
      parsedBookmarks === null ||
      parsedBookmarks === undefined ||
      !Array.isArray(parsedBookmarks)
    ) {
      console.warn(
        "LocalStorage 'bookmarkedQuotes' found but was not a valid array:",
        parsedBookmarks
      );
      return []; // Return empty array if parsing failed or result is invalid
    }
    return parsedBookmarks; // Return the valid array
  } catch (error) {
    // Handle cases where the stored string is not valid JSON
    console.error("Error parsing 'bookmarkedQuotes' from localStorage:", error);
    return []; // Return empty array if data is corrupted
  }
};

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
