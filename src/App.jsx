import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import QuoteGenerator from "./components/QuoteGenerator";
import BookmarksList from "./components/BookmarksList";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="grid grid-cols-[1fr_7fr] bg-stone-900 h-screen text-white">
      <Sidebar />
      <div className="">
        <Routes>
          <Route path="/" element={<QuoteGenerator />} />
          <Route path="/bookmarks" element={<BookmarksList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
