import Sidebar from "./components/Sidebar";
import QuoteGenerator from "./components/QuoteGenerator";
import BookmarksList from "./components/BookmarksList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  const [activeTab, setActiveTab] = useState("generator");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="grid sm:grid-cols-[1fr_7fr] bg-stone-900 h-screen text-white">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div>
        {activeTab === "generator" && <QuoteGenerator />}
        {activeTab === "bookmarks" && <BookmarksList />}
      </div>
    </div>
  );
}

export default App;
