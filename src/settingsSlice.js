import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: getInitialTheme(),
  },
  reducers: {
    setTheme (state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
